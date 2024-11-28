// src/components/AdminPanel.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Получение списка пользователей
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1>Админ Панель</h1>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя пользователя</th>
                <th>Роль</th>
                <th>Активен</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.active ? 'Да' : 'Нет'}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(user.id)}>
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>Добавить нового пользователя</h2>
          <Form action="/api/admin/users/add" method="POST">
            <Form.Group controlId="username">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control type="text" name="username" required />
            </Form.Group>
            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" name="password" required />
            </Form.Group>
            <Form.Group controlId="role" className="mt-3">
              <Form.Label>Роль</Form.Label>
              <Form.Select name="role">
                <option value="moderator">Модератор</option>
                <option value="publisher">Публицист</option>
                <option value="editor">Редактор</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Добавить пользователя
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPanel;
