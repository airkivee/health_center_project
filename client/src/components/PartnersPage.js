import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

function PartnersPage({ language }) {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/public/partners?lang=${language}`);
        setPartners(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке партнеров:', error);
      }
    };
    fetchPartners();
  }, [language]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>{language === 'kg' ? 'Партнёрлор' : 'Партнёры'}</h1>
        </Col>
      </Row>
      <Row>
        {partners.map((partner) => (
          <Col key={partner.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{language === 'kg' ? partner.name_kg : partner.name_ru}</Card.Title>
                <p>{language === 'kg' ? partner.description_kg : partner.description_ru}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PartnersPage;
