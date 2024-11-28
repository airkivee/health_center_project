// src/pages/EditorPanel.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function EditorPanel() {
  return (
    <Container>
      <h1>Панель редактора</h1>
      <Link to="/add-news">
        <Button variant="primary" className="mt-3">
          Добавить новость
        </Button>
      </Link>
      {/* Другие возможности редактора */}
    </Container>
  );
}

export default EditorPanel;
