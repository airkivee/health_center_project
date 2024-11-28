import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManageVideos() {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/editor/videos', { withCredentials: true });
        setVideos(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке видео:', error);
      }
    };
    fetchVideos();
  }, []);

  const handleDelete = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/editor/videos/${selectedVideo.id}`, { withCredentials: true });
      setVideos(videos.filter((video) => video.id !== selectedVideo.id));
    } catch (error) {
      console.error('Ошибка при удалении видео:', error);
    } finally {
      setShowModal(false);
      setSelectedVideo(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  return (
    <Container>
      <h1>Управление видео</h1>
      <Button variant="primary" className="mb-4" onClick={() => navigate('/add-video')}>
        Добавить видео
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок (Кыргызский)</th>
            <th>Заголовок (Русский)</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.id}</td>
              <td>{video.title_kg}</td>
              <td>{video.title_ru}</td>
              <td>
                <Button variant="warning" onClick={() => navigate(`/edit-video/${video.id}`)}>
                  Редактировать
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(video)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение удаления</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Вы уверены, что хотите удалить видео {selectedVideo?.title_ru}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Отмена
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageVideos;
