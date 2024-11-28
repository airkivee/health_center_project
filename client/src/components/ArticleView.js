import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function ArticleView({ language }) {
  const { id } = useParams(); // Получение ID статьи из параметров маршрута
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
  const [error, setError] = useState(null); // Добавляем состояние для ошибок

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/public/news/${id}`); // Запрос к API для получения конкретной новости
        setArticle(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке новости:', error);
        setError('Не удалось загрузить статью. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Row>
          <Col>
            <p>{language === 'kg' ? 'Жүктөө...' : 'Загрузка...'}</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Row>
          <Col>
            <p className="text-danger">{error}</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container>
        <Row>
          <Col>
            <p>{language === 'kg' ? 'Маалымат жок' : 'Нет данных'}</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>{language === 'kg' ? article.title_kg : article.title_ru}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: language === 'kg' ? article.content_kg : article.content_ru }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ArticleView;
