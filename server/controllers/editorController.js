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

// Контроллер для получения формы добавления статьи
exports.getAddArticleForm = (req, res) => {
  res.render('editor/addArticle', { title: 'Добавить статью', language: 'ru' });
};

// Контроллер для добавления новой статьи
exports.addArticle = (req, res) => {
  const { title_ru, title_kg, content_ru, content_kg } = req.body;
  pool.query(
    'INSERT INTO news (title_ru, title_kg, content_ru, content_kg, approved) VALUES ($1, $2, $3, $4, $5)',
    [title_ru, title_kg, content_ru, content_kg, false],
    (error) => {
      if (error) {
        throw error;
      }
      res.redirect('/editor/addArticle');
    }
  );
};
