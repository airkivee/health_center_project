// server/routes/editor.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { ensureAuthenticated, ensureRole } = require('../middleware/authMiddleware');

// Добавление новой статьи редактором
router.post('/articles', ensureAuthenticated, ensureRole('editor'), async (req, res) => {
  const { title_ru, title_kg, content_ru, content_kg } = req.body;
  try {
    await pool.query(
      'INSERT INTO news (title_ru, title_kg, content_ru, content_kg, approved) VALUES ($1, $2, $3, $4, $5)',
      [title_ru, title_kg, content_ru, content_kg, false]
    );
    res.status(201).send('Статья успешно добавлена и отправлена на проверку');
  } catch (error) {
    console.error('Ошибка при добавлении статьи:', error);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;
