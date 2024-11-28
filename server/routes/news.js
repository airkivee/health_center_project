const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Подключение к базе данных

// Маршрут для получения всех новостей (с мультиязычностью)
router.get('/', async (req, res) => {
    const language = req.query.lang || 'ru'; // Получение языка из параметров запроса, по умолчанию русский
    try {
        const result = await pool.query(
            `SELECT id, title_${language}, content_${language}, created_at FROM news WHERE approved = true ORDER BY created_at DESC`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка получения новостей:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// Маршрут для получения одной конкретной новости по ID (с мультиязычностью)
router.get('/:id', async (req, res) => {
    const newsId = req.params.id;
    const language = req.query.lang || 'ru';
    try {
        const result = await pool.query(
            `SELECT id, title_${language}, content_${language}, created_at FROM news WHERE id = $1`,
            [newsId]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Новость не найдена' });
        }
    } catch (error) {
        console.error('Ошибка получения новости:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
