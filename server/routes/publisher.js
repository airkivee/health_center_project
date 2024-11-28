// server/routes/publisher.js

const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { ensureAuthenticated, ensureRole } = require('../middleware/authMiddleware');

// Проверка и утверждение статьи
router.get('/viewArticles', ensureAuthenticated, ensureRole('publisher'), async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM news WHERE approved = $1', [false]);
        res.render('publisher/viewArticles', { title: 'Статьи на утверждение', articles: result.rows });
    } catch (error) {
        res.status(500).send('Ошибка сервера, попробуйте позже.');
    }
});

router.post('/approveArticle/:id', ensureAuthenticated, ensureRole('publisher'), async (req, res) => {
    const articleId = req.params.id;
    try {
        await pool.query('UPDATE news SET approved = $1 WHERE id = $2', [true, articleId]);
        res.redirect('/publisher/viewArticles');
    } catch (error) {
        res.status(500).send('Ошибка сервера, попробуйте позже.');
    }
});

module.exports = router;
