import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Используем тему Quill

function AddOrEditNews() {
  const [titleKg, setTitleKg] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [contentKg, setContentKg] = useState('');
  const [contentRu, setContentRu] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:5001/api/editor/news/${id}`, { withCredentials: true })
        .then((response) => {
          const news = response.data;
          setTitleKg(news.title_kg);
          setTitleRu(news.title_ru);
          setContentKg(news.content_kg);
          setContentRu(news.content_ru);
        })
        .catch((error) => {
          console.error('Ошибка при загрузке новости:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleSave = () => {
    setLoading(true);
    const newsData = {
      title_kg: titleKg,
      title_ru: titleRu,
      content_kg: contentKg,
      content_ru: contentRu,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Передаем куки для аутентификации
    };

    if (id) {
      axios
        .put(`http://localhost:5001/api/editor/news/${id}`, newsData, config)
        .then(() => {
          navigate('/editor');
        })
        .catch((error) => {
          console.error('Ошибка при сохранении новости:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      axios
        .post('http://localhost:5001/api/editor/news', newsData, config)
        .then(() => {
          navigate('/editor');
        })
        .catch((error) => {
          console.error('Ошибка при добавлении новости:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }, { 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }], // Цвет текста и фона
      [{ 'align': [] }],
      ['link', 'image'], // Добавление ссылок и изображений
      ['clean'], // Кнопка для очистки форматирования
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'script', 'direction',
    'align', 'color', 'background', 'link', 'image',
  ];

  return (
    <Container>
      <h1>{id ? 'Редактировать новость' : 'Добавить новость'}</h1>
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
        <Form.Group controlId="formContentKg" className="mt-3">
          <Form.Label>Контент (Кыргызский)</Form.Label>
          <ReactQuill
            value={contentKg}
            onChange={(value) => setContentKg(value)}
            modules={modules}
            formats={formats}
            theme="snow"
          />
        </Form.Group>
        <Form.Group controlId="formContentRu" className="mt-3">
          <Form.Label>Контент (Русский)</Form.Label>
          <ReactQuill
            value={contentRu}
            onChange={(value) => setContentRu(value)}
            modules={modules}
            formats={formats}
            theme="snow"
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

export default AddOrEditNews;
