const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Маршрут для получения контактов
router.get('/', async (req, res) => {
    const language = req.query.lang || 'ru';
    try {
        const result = await pool.query(
            `SELECT address_${language}, phone, email FROM contacts`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Ошибка получения контактов:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
