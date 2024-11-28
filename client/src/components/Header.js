import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.jpg';

function Header({ toggleAccessibleMode, changeLanguage, language }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Верхняя панель с логотипом, языком и версией для слабовидящих */}
      <Navbar className="header-top-navbar" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => navigate('/')}>
            <img src={logo} alt="Федерация тяжелой атлетики КР" className="header-logo header-logo-circle" />
            {language === 'kg' ? 'Федерация оор атлетикасы КР' : 'Федерация тяжёлой атлетики КР'}
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link onClick={toggleAccessibleMode}>
              {language === 'kg' ? 'Азиздер үчүн версия' : 'Версия для слабовидящих'}
            </Nav.Link>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder={language === 'kg' ? 'Издөө' : 'Поиск'}
                className="me-2"
                aria-label="Поиск"
              />
              <Button variant="outline-light">{language === 'kg' ? 'Издөө' : 'Поиск'}</Button>
            </Form>
            <Nav.Link onClick={() => changeLanguage('kg')}>KG</Nav.Link>
            <Nav.Link onClick={() => changeLanguage('ru')}>RU</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Нижняя панель с основной навигацией */}
      <Navbar expand="lg" className="header-bottom-navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/')}>
                {language === 'kg' ? 'Башкы бет' : 'Главная'}
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/news')}>
                {language === 'kg' ? 'Жаңылыктар' : 'Новости'}
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/videos')}>
                {language === 'kg' ? 'Видео' : 'Видео'}
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/partners')}>
                {language === 'kg' ? 'Өнөктөштөр' : 'Партнёры'}
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/projects')}>
                {language === 'kg' ? 'Долбоорлор' : 'Проекты'}
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/contacts')}>
                {language === 'kg' ? 'Байланыштар' : 'Контакты'}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;