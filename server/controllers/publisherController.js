// Импорт необходимых модулей
const { Pool } = require('pg');

// Настройка подключения к PostgreSQL
const pool = new Pool({
  user: 'postgres',  // Замените на ваше имя пользователя PostgreSQL
  host: 'localhost',
  database: 'health_center',
  password: '30022051',     // Замените на ваш пароль от PostgreSQL
  port: 5432,
});

// Контроллер для получения списка статей на публикацию
exports.getArticlesForReview = (req, res) => {
  pool.query('SELECT * FROM news WHERE approved = false', (error, results) => {
    if (error) {
      throw error;
    }
    res.render('publisher/viewArticles', { title: 'Материалы на публикацию', language: 'ru', articles: results.rows });
  });
};

// Контроллер для утверждения статьи для публикации
exports.approveArticle = (req, res) => {
  const articleId = req.params.id;
  pool.query('UPDATE news SET approved = true WHERE id = $1', [articleId], (error) => {
    if (error) {
      throw error;
    }
    res.redirect('/publisher/viewArticles');
  });
};
