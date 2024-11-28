import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function AddUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('editor');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5001/api/admin/users/add',
        {
          username,
          password,
          role,
        },
        { withCredentials: true }
      );
      setMessage(response.data);
      setUsername('');
      setPassword('');
      setRole('editor');
    } catch (error) {
      console.error('Ошибка при добавлении пользователя:', error);
      setError('Ошибка при добавлении пользователя. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <Container>
      <h1>Добавить нового пользователя</h1>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleAddUser}>
        <Form.Group controlId="formUsername">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRole">
          <Form.Label>Роль пользователя</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="editor">Редактор</option>
            <option value="publisher">Публицист</option>
            <option value="moderator">Модератор</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Добавить пользователя
        </Button>
      </Form>
    </Container>
  );
}

export default AddUser;
