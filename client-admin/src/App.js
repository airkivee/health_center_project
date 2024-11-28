import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UniversalNavbar from './components/Navbar'; // Импортируем компонент боковой панели
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import ManageUsers from './pages/UserManagement';
import ManageNews from './pages/ManageNews';
import AddOrEditNews from './pages/AddOrEditNews';
import EditorPanel from './pages/EditorPanel'; // Панель редактора
import ManageVideos from './pages/ManageVideos'; // Управление видео
import AddOrEditVideo from './pages/AddOrEditVideo'; // Добавление и редактирование видео
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Маршрут для страницы авторизации */}
        <Route path="/" element={<LoginPage />} />

        {/* Оборачиваем все маршруты, требующие навигации, в UniversalNavbar */}
        <Route element={<UniversalNavbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-news" element={<ManageNews />} />
          <Route path="/add-news" element={<AddOrEditNews />} />
          <Route path="/edit-news/:id" element={<AddOrEditNews />} />
          <Route path="/editor" element={<EditorPanel />} />
          <Route path="/manage-videos" element={<ManageVideos />} />
          <Route path="/add-video" element={<AddOrEditVideo />} />
          <Route path="/edit-video/:id" element={<AddOrEditVideo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
