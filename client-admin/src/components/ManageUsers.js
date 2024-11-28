import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Modal } from 'react-bootstrap';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [action, setAction] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/admin/users', { withCredentials: true });
        setUsers(response.data.filter((user) => user.role !== 'admin'));
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setAction('delete');
    setShowModal(true);
  };

  const handleToggleActive = (user) => {
    setSelectedUser(user);
    setAction('toggleActive');
    setShowModal(true);
  };

  const confirmAction = async () => {
    try {
      if (action === 'delete') {
        await axios.delete(`http://localhost:5001/api/admin/users/${selectedUser.id}`, { withCredentials: true });
        setUsers(users.filter((user) => user.id !== selectedUser.id));
      } else if (action === 'toggleActive') {
        await axios.put(`http://localhost:5001/api/admin/users/${selectedUser.id}/toggle-active`, {}, { withCredentials: true });
        setUsers(users.map((user) => {
          if (user.id === selectedUser.id) {
            return { ...user, is_active: !user.is_active };
          }
          return user;
        }));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Ошибка авторизации. Пожалуйста, войдите в систему заново.');
      } else if (error.response && error.response.status === 404) {
        console.error('Пользователь не найден.');
      } else {
        console.error('Ошибка при выполнении действия:', error);
      }
    } finally {
      setShowModal(false);
      setSelectedUser(null);
      setAction('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setAction('');
  };

  return (
    <Container>
      <h1>Управление пользователями</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя пользователя</th>
            <th>Роль</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.is_active ? 'Активен' : 'Неактивен'}</td>
              <td>
                <Button variant="warning" onClick={() => handleToggleActive(user)}>
                  {user.is_active ? 'Приостановить' : 'Активировать'}
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(user)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение действия</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {action === 'delete' ? (
            <p>Вы уверены, что хотите удалить пользователя {selectedUser?.username}?</p>
          ) : (
            <p>
              Вы уверены, что хотите {selectedUser?.is_active ? 'приостановить' : 'активировать'} пользователя {selectedUser?.username}?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Отмена
          </Button>
          <Button variant="primary" onClick={confirmAction}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ManageUsers;
