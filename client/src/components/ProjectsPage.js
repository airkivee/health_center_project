import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

function ProjectsPage({ language }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/public/projects?lang=${language}`);
        setProjects(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке проектов:', error);
      }
    };
    fetchProjects();
  }, [language]);

  return (
    <Container>
      <Row>
        <Col>
          <h1>{language === 'kg' ? 'Долбоорлор' : 'Проекты'}</h1>
        </Col>
      </Row>
      <Row>
        {projects.map((project) => (
          <Col key={project.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{language === 'kg' ? project.title_kg : project.title_ru}</Card.Title>
                <p>{language === 'kg' ? project.description_kg : project.description_ru}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProjectsPage;
