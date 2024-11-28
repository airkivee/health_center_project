import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function NewsList({ language }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/public/news?lang=${language}`);
        setNews(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    };
    fetchNews();
  }, [language]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>{language === 'kg' ? 'Жаңылыктар' : 'Новости'}</h1>
        </Col>
      </Row>
      <Row>
        {news.map((article) => (
          <Col key={article.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{language === 'kg' ? article.title_kg : article.title_ru}</Card.Title>
                <Link to={`/article/${article.id}`}>
                  <Button variant="primary">{language === 'kg' ? 'Толук окуу' : 'Читать далее'}</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default NewsList;
