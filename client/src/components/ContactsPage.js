import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function ContactsPage({ language }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/public/contacts?lang=${language}`);
        setContact(response.data[0]);
      } catch (error) {
        console.error('Ошибка при загрузке контактов:', error);
      }
    };
    fetchContact();
  }, [language]);

  if (!contact) {
    return (
      <Container>
        <Row>
          <Col>
            <p>{language === 'kg' ? 'Жүктөө...' : 'Загрузка...'}</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>{language === 'kg' ? 'Байланыш маалыматтары' : 'Контактная информация'}</h1>
          <p><strong>{language === 'kg' ? 'Дарек' : 'Адрес'}:</strong> {contact[`address_${language}`]}</p>
          <p><strong>{language === 'kg' ? 'Телефон' : 'Телефон'}:</strong> {contact.phone}</p>
          <p><strong>{language === 'kg' ? 'Электрондук почта' : 'Электронная почта'}:</strong> {contact.email}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactsPage;
