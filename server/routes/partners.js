const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Маршрут для получения всех партнеров
router.get('/', async (req, res) => {
    const language = req.query.lang || 'ru';
    try {
        const result = await pool.query(
            `SELECT id, name_${language}, description_${language}, logo_url FROM partners ORDER BY id`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка получения партнеров:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
