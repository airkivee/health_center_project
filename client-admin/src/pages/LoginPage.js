import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/admin/login', { username, password }, {
        withCredentials: true // Разрешаем передавать куки с запросом
      });
      sessionStorage.setItem('user', JSON.stringify(response.data));
      switch (response.data.role) {
        case 'admin':
          navigate('/manage-users');
          break;
        case 'moderator':
          navigate('/moderator');
          break;
        case 'publisher':
          navigate('/publisher');
          break;
        case 'editor':
          navigate('/editor');
          break;
        default:
          navigate('/login');
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <Container>
      <h1>Авторизация</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
