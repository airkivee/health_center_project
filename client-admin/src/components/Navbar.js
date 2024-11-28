import React, { useState } from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { useNavigate, Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from '../assets/logo.jpg';
import '../styles/Navbar.css';

function UniversalNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  // Функция для определения навигационных ссылок на основе роли пользователя
  const renderNavLinks = () => {
    if (user) {
      switch (user.role) {
        case 'admin':
          return (
            <>
              <Nav.Link onClick={() => navigate('/manage-users')}>Управление пользователями</Nav.Link>
              <Nav.Link onClick={() => navigate('/manage-news')}>Управление новостями</Nav.Link>
              <Nav.Link onClick={() => navigate('/manage-videos')}>Управление видео</Nav.Link>
            </>
          );
        case 'editor':
          return (
            <>
              <Nav.Link onClick={() => navigate('/manage-news')}>Редактировать новости</Nav.Link>
              <Nav.Link onClick={() => navigate('/add-video')}>Добавить видео</Nav.Link>
              <Nav.Link onClick={() => navigate('/manage-videos')}>Управление видео</Nav.Link>
            </>
          );
        default:
          return null;
      }
    }
  };

  return (
    <div className={`main-container ${showSidebar ? 'sidebar-open' : ''}`}> {/* Оборачиваем весь контент в контейнер */}
      {/* Хедер с кнопкой для открытия боковой панели и кнопкой "Выйти" */}
      <Navbar bg="dark" variant="dark" className="mb-4 fixed-top">
        <Container>
          <Button variant="link" className="text-white" onClick={toggleSidebar}>
            <FaBars size={20} />
          </Button>
          <Navbar.Brand className="ms-3">
            <img
              src={logo}
              height="30"
              className="me-2"
              alt="Логотип Федерации"
            />
            Федерация тяжелой атлетики Кыргызской Республики
          </Navbar.Brand>
          <Button variant="outline-light" onClick={handleLogout} className="ms-auto">
            Выйти
          </Button>
        </Container>
      </Navbar>

      {/* Боковая панель с навигацией */}
      <div className={`sidebar ${showSidebar ? 'open' : ''}`}> {/* Боковая панель со сдвигом */}
        <div className="sidebar-header">
          <Button variant="link" onClick={toggleSidebar} className="close-button">
            &times;
          </Button>
          <h5>Навигация</h5>
        </div>
        <Nav className="flex-column">
          {renderNavLinks()}
        </Nav>
      </div>

      {/* Основной контент */}
      <div className="content">
        <Outlet /> {/* Используем Outlet для рендеринга дочерних элементов маршрутов */}
      </div>
    </div>
  );
}

export default UniversalNavbar;
