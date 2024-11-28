import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddOrEditVideo() {
  const [titleKg, setTitleKg] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:5001/api/editor/videos/${id}`, { withCredentials: true })
        .then((response) => {
          const video = response.data;
          setTitleKg(video.title_kg);
          setTitleRu(video.title_ru);
          setVideoUrl(video.video_url);
        })
        .catch((error) => {
          console.error('Ошибка при загрузке видео:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleSave = () => {
    setLoading(true);
    const videoData = {
      title_kg: titleKg,
      title_ru: titleRu,
      video_url: videoUrl,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    if (id) {
      axios
        .put(`http://localhost:5001/api/editor/videos/${id}`, videoData, config)
        .then(() => {
          navigate('/manage-videos');
        })
        .catch((error) => {
          console.error('Ошибка при сохранении видео:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .post('http://localhost:5001/api/editor/videos', videoData, config)
        .then(() => {
          navigate('/manage-videos');
        })
        .catch((error) => {
          console.error('Ошибка при добавлении видео:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Container>
      <h1>{id ? 'Редактировать видео' : 'Добавить видео'}</h1>
      <Form>
        <Form.Group controlId="formTitleKg">
          <Form.Label>Заголовок (Кыргызский)</Form.Label>
          <Form.Control
            type="text"
            value={titleKg}
            onChange={(e) => setTitleKg(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formTitleRu" className="mt-3">
          <Form.Label>Заголовок (Русский)</Form.Label>
          <Form.Control
            type="text"
            value={titleRu}
            onChange={(e) => setTitleRu(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formVideoUrl" className="mt-3">
          <Form.Label>Ссылка на видео (YouTube)</Form.Label>
          <Form.Control
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          className="mt-4"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </Form>
    </Container>
  );
}

export default AddOrEditVideo;
