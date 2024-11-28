// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Получение всех пользователей (API)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, role, is_active FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Добавление нового пользователя (API)
router.post('/add', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password, role, is_active) VALUES ($1, $2, $3, true)', [username, hashedPassword, role]);
    res.status(201).send('Пользователь добавлен');
  } catch (error) {
    console.error('Ошибка при добавлении пользователя:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Удаление пользователя (API)
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    res.status(200).send('Пользователь удалён');
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Переключение статуса активности пользователя (API)
router.put('/:id/toggle-active', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await pool.query('SELECT is_active FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return res.status(404).send('Пользователь не найден');
    }
    const newStatus = !user.rows[0].is_active;
    await pool.query('UPDATE users SET is_active = $1 WHERE id = $2', [newStatus, userId]);
    res.status(200).send('Статус пользователя изменён');
  } catch (error) {
    console.error('Ошибка при изменении статуса пользователя:', error);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;
