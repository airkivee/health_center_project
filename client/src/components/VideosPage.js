import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

function VideosPage({ language }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/public/videos?lang=${language}`);
        setVideos(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке видео:', error);
      }
    };
    fetchVideos();
  }, [language]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>{language === 'kg' ? 'Видео' : 'Видео'}</h1>
        </Col>
      </Row>
      <Row>
        {videos.map((video) => (
          <Col key={video.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{language === 'kg' ? video.title_kg : video.title_ru}</Card.Title>
                <div>
                  <iframe
                    width="100%"
                    height="215"
                    src={video.url}
                    title={language === 'kg' ? video.title_kg : video.title_ru}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default VideosPage;
