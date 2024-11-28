// src/components/ModeratorPanel.js

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import axios from 'axios';

function ModeratorPanel() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/moderator/registration-requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке заявок на регистрацию:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await axios.post(`/api/moderator/approve/${requestId}`);
      setRequests(requests.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error('Ошибка при утверждении заявки:', error);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1>Панель Модератора</h1>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>
                    <Button variant="success" onClick={() => handleApprove(request.id)}>
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

export default ModeratorPanel;
