const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Маршрут для получения всех проектов
router.get('/', async (req, res) => {
    const language = req.query.lang || 'ru';
    try {
        const result = await pool.query(
            `SELECT id, title_${language}, description_${language}, created_at FROM projects ORDER BY created_at DESC`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка получения проектов:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
