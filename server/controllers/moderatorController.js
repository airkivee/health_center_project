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

// Контроллер для получения списка регистрационных анкет
exports.getRegistrationForms = (req, res) => {
  pool.query('SELECT * FROM registration_forms WHERE status = $1', ['pending'], (error, results) => {
    if (error) {
      throw error;
    }
    res.render('moderator/viewForms', { title: 'Регистрационные анкеты', language: 'ru', forms: results.rows });
  });
};

// Контроллер для утверждения регистрационной анкеты
exports.approveForm = (req, res) => {
  const formId = req.params.id;
  pool.query('UPDATE registration_forms SET status = $1 WHERE id = $2', ['approved', formId], (error) => {
    if (error) {
      throw error;
    }
    res.redirect('/moderator/viewForms');
  });
};
