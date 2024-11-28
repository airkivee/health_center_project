// src/components/EditorPanel.js

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

function EditorPanel() {
  const [titleRu, setTitleRu] = useState('');
  const [titleKg, setTitleKg] = useState('');
  const [contentRu, setContentRu] = useState('');
  const [contentKg, setContentKg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/editor/articles', {
        title_ru: titleRu,
        title_kg: titleKg,
        content_ru: contentRu,
        content_kg: contentKg,
      });
      alert('Статья успешно отправлена на проверку!');
    } catch (error) {
      console.error('Ошибка при добавлении статьи:', error);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1>Панель Редактора</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="titleRu" className="mt-3">
              <Form.Label>Заголовок (Русский)</Form.Label>
              <Form.Control
                type="text"
                value={titleRu}
                onChange={(e) => setTitleRu(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="titleKg" className="mt-3">
              <Form.Label>Заголовок (Кыргызский)</Form.Label>
              <Form.Control
                type="text"
                value={titleKg}
                onChange={(e) => setTitleKg(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="contentRu" className="mt-4">
              <Form.Label>Содержание (Русский)</Form.Label>
              <ReactQuill value={contentRu} onChange={setContentRu} />
            </Form.Group>

            <Form.Group controlId="contentKg" className="mt-4">
              <Form.Label>Содержание (Кыргызский)</Form.Label>
              <ReactQuill value={contentKg} onChange={setContentKg} />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Отправить на проверку
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditorPanel;
