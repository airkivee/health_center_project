const express = require('express'); 
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const pool = require('./config/db'); // Подключение к базе данных
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const videoRoutes = require('./routes/videoRoutes');
const { ensureAuthenticated, ensureRole } = require('./middleware/authMiddleware');

require('dotenv').config();
const app = express();

// Подключение CORS для разрешения запросов с другого домена (например, с порта 3000)
app.use(cors({
  origin: 'http://localhost:3000', // URL клиента
  credentials: true, // Разрешить отправку cookie
}));

// Middleware для обработки JSON, URL-кодирования, сессий и статических файлов
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false }, // Установите secure: true при использовании HTTPS
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение маршрутов
app.use('/api/admin', authRoutes);
app.use('/api/admin/users', ensureAuthenticated, ensureRole('admin'), userRoutes);
app.use('/api/editor/news', ensureAuthenticated, ensureRole('editor'), newsRoutes);
app.use('/api/editor/videos', ensureAuthenticated, ensureRole('editor'), videoRoutes);

// Настройка сервера для прослушивания на указанном порту
const PORT = process.env.ADMIN_PORT || 5001;
app.listen(PORT, () => {
  console.log(`Сервер административной части работает на порту ${PORT}`);
});
