const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/db');
const publicNewsRoutes = require('./routes/news'); // Публичные новости
const publicVideosRoutes = require('./routes/videos'); // Публичные видео
const publicPartnersRoutes = require('./routes/partners'); // Публичные партнеры
const publicProjectsRoutes = require('./routes/projects'); // Публичные проекты
const publicContactsRoutes = require('./routes/contacts'); // Публичные контакты

const app = express();

// Middleware для обработки JSON, URL-кодирования и статических файлов
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение маршрутов для публичной части сайта
app.use('/api/public/news', publicNewsRoutes);
app.use('/api/public/videos', publicVideosRoutes);
app.use('/api/public/partners', publicPartnersRoutes);
app.use('/api/public/projects', publicProjectsRoutes);
app.use('/api/public/contacts', publicContactsRoutes);

// Установка движка представлений для рендеринга страниц
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Маршрут для основной части сайта (например, перенаправление на новости)
app.get('/', (req, res) => {
  res.redirect('/api/public/news');
});

// Обработка ошибок 404
app.use((req, res, next) => {
  res.status(404).send('Страница не найдена');
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error('Произошла ошибка:', err);
  res.status(500).send('Ошибка сервера');
});

// Настройка сервера для прослушивания на указанном порту
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
