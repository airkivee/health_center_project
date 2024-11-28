import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'; // Добавьте логотип в папку assets

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand onClick={() => navigate('/admin/dashboard')} style={{ cursor: 'pointer' }}>
          <img
            alt="Федерация тяжелой атлетики КР"
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          Федерация тяжелой атлетики КР - Админ Панель
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && user.role === 'admin' && (
              <>
                <Nav.Link onClick={() => navigate('/manage-users')} style={{ cursor: 'pointer' }}>Управление пользователями</Nav.Link>
                <Nav.Link onClick={() => navigate('/add-user')} style={{ cursor: 'pointer' }}>Добавить пользователя</Nav.Link>
              </>
            )}
            {user && user.role === 'editor' && (
  <>
    <Nav.Link onClick={() => navigate('/manage-news')}>Управление новостями</Nav.Link>
    <Nav.Link onClick={() => navigate('/add-news')}>Добавить новость</Nav.Link>
    <Nav.Link onClick={() => navigate('/manage-videos')}>Управление видео</Nav.Link>
  </>
)}

            <Nav.Link
              onClick={() => {
                sessionStorage.removeItem('user');
                navigate('/');
              }}
              style={{ cursor: 'pointer' }}
            >
              Выйти
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
