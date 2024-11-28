// src/components/PublisherPanel.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';

function PublisherPanel() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/publisher/pending-articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке статей на утверждение:', error);
      }
    };
    fetchArticles();
  }, []);

  const handleApprove = async (articleId) => {
    try {
      await axios.post(`/api/publisher/approve/${articleId}`);
      setArticles(articles.filter((article) => article.id !== articleId));
    } catch (error) {
      console.error('Ошибка при утверждении статьи:', error);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1>Панель Публициста</h1>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Заголовок</th>
                <th>Автор</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>{article.id}</td>
                  <td>{article.title}</td>
                  <td>{article.author}</td>
                  <td>
                    <Button variant="success" onClick={() => handleApprove(article.id)}>
                      Утвердить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default PublisherPanel;
