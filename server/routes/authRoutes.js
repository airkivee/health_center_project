// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Маршрут для входа в систему (авторизация)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Проверяем, существует ли пользователь с указанным именем
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Сравнение введенного пароля с хэшированным паролем в БД
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        // Сохраняем информацию о пользователе в сессии
        req.session.user = {
          id: user.id,
          username: user.username,
          role: user.role,
        };

        // Логируем содержимое сессии для проверки
        console.log('Сессия после авторизации:', req.session);

        res.status(200).json({
          id: user.id,
          username: user.username,
          role: user.role,
        });
      } else {
        res.status(401).send('Неверное имя пользователя или пароль');
      }
    } else {
      res.status(401).send('Неверное имя пользователя или пароль');
    }
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Маршрут для выхода из системы
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Ошибка при выходе');
    }
    res.status(200).send('Вы успешно вышли из системы');
  });
});

module.exports = router;
