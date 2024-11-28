// server/routes/moderator.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { ensureAuthenticated, ensureRole } = require('../middleware/authMiddleware');

// Получение всех заявок на регистрацию
router.get('/registration-requests', ensureAuthenticated, ensureRole('moderator'), async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registration_forms WHERE approved = false');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении заявок на регистрацию:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Утверждение заявки на регистрацию
router.post('/approve/:id', ensureAuthenticated, ensureRole('moderator'), async (req, res) => {
  const requestId = req.params.id;
  try {
    await pool.query('UPDATE registration_forms SET approved = true WHERE id = $1', [requestId]);
    res.status(200).send('Заявка успешно утверждена');
  } catch (error) {
    console.error('Ошибка при утверждении заявки:', error);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;
