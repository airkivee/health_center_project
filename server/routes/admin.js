// server/routes/admin.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Управление пользователями
router.get('/manageUsers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.render('admin/manageUsers', { users: result.rows });
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Добавление пользователя
router.post('/manageUsers/add', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    await pool.query('INSERT INTO users (username, password, role) VALUES ($1, $2, $3)', [username, password, role]);
    res.redirect('/admin/manageUsers');
  } catch (error) {
    console.error('Ошибка при добавлении пользователя:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Удаление пользователя
router.post('/manageUsers/delete/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    res.redirect('/admin/manageUsers');
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;
