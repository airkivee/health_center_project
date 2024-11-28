// Dashboard.js: Главная страница админ-панели.
import React from 'react';
import { Container } from 'react-bootstrap';

function Dashboard() {
  return (
    <Container>
      <h1>Добро пожаловать в админ-панель!</h1>
      <p>Выберите необходимый раздел для управления сайтом.</p>
    </Container>
  );
}

export default Dashboard;