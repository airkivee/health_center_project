const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { ensureAuthenticated, ensureRole } = require('../middleware/authMiddleware');

/// Получение всех видео
router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM videos ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (error) {
      console.error('Ошибка при получении видео:', error);
      res.status(500).send('Ошибка сервера');
    }
  });
  
  // Получение одного видео по ID
  router.get('/:id', async (req, res) => {
    const videoId = parseInt(req.params.id, 10);
    if (isNaN(videoId)) {
      return res.status(400).send('Ошибка: Неверный формат ID');
    }
  
    try {
      const result = await pool.query('SELECT * FROM videos WHERE id = $1', [videoId]);
      if (result.rows.length === 0) {
        return res.status(404).send('Видео не найдено');
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Ошибка при получении видео:', error);
      res.status(500).send('Ошибка сервера');
    }
  });

// Добавление нового видео
router.post('/', ensureAuthenticated, ensureRole('editor'), async (req, res) => {
    console.log('Запрос на добавление видео получен');
    console.log('Request body:', req.body); // Логирование тела запроса
  
    const { title_kg, title_ru, video_url, description_kg, description_ru } = req.body;
  
    // Проверка, что все обязательные поля заполнены
    if (!title_kg || !title_ru || !video_url) {
      console.error('Ошибка: Не все обязательные поля заполнены');
      return res.status(400).send('Ошибка: Не все обязательные поля заполнены');
    }
  
    try {
      // Запрос к базе данных на добавление нового видео
      const result = await pool.query(
        'INSERT INTO videos (title_kg, title_ru, video_url, description_kg, description_ru, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
        [title_kg, title_ru, video_url, description_kg, description_ru]
      );
      console.log('Видео успешно добавлено в базу данных:', result);
      res.status(201).send('Видео добавлено');
    } catch (error) {
      console.error('Ошибка при добавлении видео в базу данных:', error);
      res.status(500).send('Ошибка сервера');
    }
  });

// Обновление видео
router.put('/:id', ensureAuthenticated, ensureRole('editor'), async (req, res) => {
  const videoId = req.params.id;
  const { title_kg, title_ru, video_url, description_kg, description_ru } = req.body;
  try {
    await pool.query(
      'UPDATE videos SET title_kg = $1, title_ru = $2, video_url = $3, description_kg = $4, description_ru = $5 WHERE id = $6',
      [title_kg, title_ru, video_url, description_kg, description_ru, videoId]
    );
    res.status(200).send('Видео обновлено');
  } catch (error) {
    console.error('Ошибка при обновлении видео:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Удаление видео
router.delete('/:id', ensureAuthenticated, ensureRole('editor'), async (req, res) => {
  const videoId = req.params.id;
  try {
    await pool.query('DELETE FROM videos WHERE id = $1', [videoId]);
    res.status(200).send('Видео удалено');
  } catch (error) {
    console.error('Ошибка при удалении видео:', error);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;
