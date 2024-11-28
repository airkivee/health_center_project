// server/routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Получение всех новостей
router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM news ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (error) {
      console.error('Ошибка при получении новостей:', error);
      res.status(500).send('Ошибка сервера');
    }
  });
  
  // Получение последних новостей (например, топ-3)
  router.get('/latest', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM news ORDER BY created_at DESC LIMIT 3');
      res.json(result.rows);
    } catch (error) {
      console.error('Ошибка при получении последних новостей:', error);
      res.status(500).send('Ошибка сервера');
    }
  });
  
  // Получение одной новости по ID
  router.get('/:id', async (req, res) => {
    const newsId = parseInt(req.params.id, 10);
    if (isNaN(newsId)) {
      return res.status(400).send('Ошибка: Неверный формат ID');
    }
  
    try {
      const result = await pool.query('SELECT * FROM news WHERE id = $1', [newsId]);
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).send('Новость не найдена');
      }
    } catch (error) {
      console.error('Ошибка при получении новости:', error);
      res.status(500).send('Ошибка сервера');
    }
  });

// Добавление новой новости
router.post('/', async (req, res) => {
  const { title_ru, title_kg, content_ru, content_kg } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO news (title_ru, title_kg, content_ru, content_kg, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [title_ru, title_kg, content_ru, content_kg]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при добавлении новости:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Редактирование существующей новости
router.put('/:id', async (req, res) => {
  const newsId = req.params.id;
  const { title_ru, title_kg, content_ru, content_kg } = req.body;
  try {
    const result = await pool.query(
      'UPDATE news SET title_ru = $1, title_kg = $2, content_ru = $3, content_kg = $4 WHERE id = $5 RETURNING *',
      [title_ru, title_kg, content_ru, content_kg, newsId]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Новость не найдена');
    }
  } catch (error) {
    console.error('Ошибка при редактировании новости:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Удаление новости
router.delete('/:id', async (req, res) => {
  const newsId = req.params.id;
  try {
    const result = await pool.query('DELETE FROM news WHERE id = $1 RETURNING *', [newsId]);
    if (result.rows.length > 0) {
      res.status(200).send('Новость удалена');
    } else {
      res.status(404).send('Новость не найдена');
    }
  } catch (error) {
    console.error('Ошибка при удалении новости:', error);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;