// server/userServer.js - Основной сервер для пользователей
const express = require('express');
const path = require('path');
const newsRoutes = require('./routes/news');
const videosRoutes = require('./routes/videos');
const partnersRoutes = require('./routes/partners');
const projectsRoutes = require('./routes/projects');
const contactsRoutes = require('./routes/contacts');

const app = express();

// Middleware для обработки JSON, URL-кодирования и статических файлов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Подключение маршрутов для основной части сайта
app.use('/api/news', newsRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contacts', contactsRoutes);

// Установка движка представлений для рендеринга страниц
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Настройка сервера для прослушивания на указанном порту
const PORT = process.env.USER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер основной части работает на порту ${PORT}`);
});
