import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManageNews() {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/editor/news', { withCredentials: true });
        setNews(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    };
    fetchNews();
  }, []);

  const handleDelete = (newsItem) => {
    setSelectedNews(newsItem);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/editor/news/${selectedNews.id}`, { withCredentials: true });
      setNews(news.filter((item) => item.id !== selectedNews.id));
    } catch (error) {
      console.error('Ошибка при удалении новости:', error);
    } finally {
      setShowModal(false);
      setSelectedNews(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNews(null);
  };

  return (
    <Container>
      <h1>Управление новостями</h1>
      <Button variant="primary" className="mb-4" onClick={() => navigate('/editor/add-news')}>
        Добавить новость
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
          {news.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title_kg}</td>
              <td>{item.title_ru}</td>
              <td>
                <Button variant="warning" onClick={() => navigate(`/editor/edit-news/${item.id}`)}>
                  Редактировать
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(item)}>
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
          <p>Вы уверены, что хотите удалить новость {selectedNews?.title_ru}?</p>
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

export default ManageNews;
