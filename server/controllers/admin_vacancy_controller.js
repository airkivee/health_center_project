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

// Контроллер для получения формы добавления вакансии
exports.getAddVacancyForm = (req, res) => {
  res.render('admin/addVacancy', { title: 'Добавить вакансию', language: 'ru' });
};

// Контроллер для добавления новой вакансии
exports.addVacancy = (req, res) => {
  const { title, description, requirements, salary } = req.body;
  pool.query(
    'INSERT INTO vacancies (title, description, requirements, salary) VALUES ($1, $2, $3, $4)',
    [title, description, requirements, salary],
    (error) => {
      if (error) {
        throw error;
      }
      res.redirect('/admin/viewVacancies');
    }
  );
};

// Контроллер для получения всех вакансий
exports.getAllVacancies = (req, res) => {
  pool.query('SELECT * FROM vacancies', (error, results) => {
    if (error) {
      throw error;
    }
    res.render('admin/viewVacancies', { title: 'Просмотр вакансий', language: 'ru', vacancies: results.rows });
  });
};
