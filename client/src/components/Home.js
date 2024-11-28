import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home({ language }) {
  const [latestNews, setLatestNews] = useState(null);
  const [latestVideo, setLatestVideo] = useState(null);
  const [latestPartner, setLatestPartner] = useState(null);
  const [latestProject, setLatestProject] = useState(null);

  useEffect(() => {
    const fetchLatestEntries = async () => {
      try {
        const newsResponse = await axios.get(`http://localhost:5000/api/public/news?lang=${language}`);
        setLatestNews(newsResponse.data[0]); // Получаем первую новость

        const videoResponse = await axios.get(`http://localhost:5000/api/public/videos?lang=${language}`);
        setLatestVideo(videoResponse.data[0]); // Получаем первое видео

        const partnerResponse = await axios.get(`http://localhost:5000/api/public/partners?lang=${language}`);
        setLatestPartner(partnerResponse.data[0]); // Получаем первого партнера

        const projectResponse = await axios.get(`http://localhost:5000/api/public/projects?lang=${language}`);
        setLatestProject(projectResponse.data[0]); // Получаем первый проект
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchLatestEntries();
  }, [language]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>{language === 'kg' ? 'Кыргыз Мамлекеттик оор атлетика федерациясы' : 'Федерация тяжелой атлетики Кыргызской Республики'}</h1>
          <p>{language === 'kg' ? 'Саламдашуу текст' : 'Приветственный текст'}</p>
        </Col>
      </Row>

      {/* Новости */}
      {latestNews && (
        <Row className="mt-5">
          <Col>
            <h2>{language === 'kg' ? 'Жаңылыктар' : 'Новости'}</h2>
            <Card>
              <Card.Body>
                <Card.Title>{language === 'kg' ? latestNews.title_kg : latestNews.title_ru}</Card.Title>
                <Link to={`/article/${latestNews.id}`}>
                  <Button variant="primary">{language === 'kg' ? 'Толук окуу' : 'Читать далее'}</Button>
                </Link>
              </Card.Body>
            </Card>
            <Link to="/news">
              <Button variant="link">{language === 'kg' ? 'Баарын көрүү' : 'Смотреть все'}</Button>
            </Link>
          </Col>
        </Row>
      )}

      {/* Видео */}
      {latestVideo && (
        <Row className="mt-5">
          <Col>
            <h2>{language === 'kg' ? 'Видео' : 'Видео'}</h2>
            <Card>
              <Card.Body>
                <Card.Title>{language === 'kg' ? latestVideo.title_kg : latestVideo.title_ru}</Card.Title>
                <div>
                  <iframe
                    width="100%"
                    height="215"
                    src={latestVideo.url}
                    title={language === 'kg' ? latestVideo.title_kg : latestVideo.title_ru}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Card.Body>
            </Card>
            <Link to="/videos">
              <Button variant="link">{language === 'kg' ? 'Баарын көрүү' : 'Смотреть все'}</Button>
            </Link>
          </Col>
        </Row>
      )}

      {/* Партнёры */}
      {latestPartner && (
        <Row className="mt-5">
          <Col>
            <h2>{language === 'kg' ? 'Партнёрлор' : 'Партнёры'}</h2>
            <Card>
              <Card.Body>
                <Card.Title>{language === 'kg' ? latestPartner.name_kg : latestPartner.name_ru}</Card.Title>
                <Link to={`/partners`}>
                  <Button variant="primary">{language === 'kg' ? 'Толук маалымат' : 'Подробнее'}</Button>
                </Link>
              </Card.Body>
            </Card>
            <Link to="/partners">
              <Button variant="link">{language === 'kg' ? 'Баарын көрүү' : 'Смотреть все'}</Button>
            </Link>
          </Col>
        </Row>
      )}

      {/* Проекты */}
      {latestProject && (
        <Row className="mt-5">
          <Col>
            <h2>{language === 'kg' ? 'Долбоорлор' : 'Проекты'}</h2>
            <Card>
              <Card.Body>
                <Card.Title>{language === 'kg' ? latestProject.title_kg : latestProject.title_ru}</Card.Title>
                <Link to={`/projects`}>
                  <Button variant="primary">{language === 'kg' ? 'Толук маалымат' : 'Подробнее'}</Button>
                </Link>
              </Card.Body>
            </Card>
            <Link to="/projects">
              <Button variant="link">{language === 'kg' ? 'Баарын көрүү' : 'Смотреть все'}</Button>
            </Link>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Home;
