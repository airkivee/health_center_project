// Импорт необходимых модулей
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// Настройка подключения к PostgreSQL
const pool = new Pool({
  user: 'postgres',  // Замените на ваше имя пользователя PostgreSQL
  host: 'localhost',
  database: 'health_center',
  password: '30022051',     // Замените на ваш пароль от PostgreSQL
  port: 5432,
});

// Контроллер для получения главной страницы админ панели
exports.getAdminPanel = (req, res) => {
  res.render('admin/adminPanel', { title: 'Админ Панель', language: 'ru' });
};

// Контроллер для получения формы добавления пользователя
exports.getAddUserForm = (req, res) => {
  res.render('admin/addUser', { title: 'Добавить пользователя', language: 'ru' });
};

// Контроллер для добавления нового пользователя
exports.addUser = (req, res) => {
  const { username, password, role } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      throw err;
    }
    pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
      [username, hash, role],
      (error) => {
        if (error) {
          throw error;
        }
        res.redirect('/admin/manageUsers');
      }
    );
  });
};

// Контроллер для получения списка пользователей
exports.getManageUsers = (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error;
    }
    res.render('admin/manageUsers', { title: 'Управление пользователями', language: 'ru', users: results.rows });
  });
};

// Контроллер для удаления пользователя
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  pool.query('DELETE FROM users WHERE id = $1', [userId], (error) => {
    if (error) {
      throw error;
    }
    res.redirect('/admin/manageUsers');
  });
};

// Контроллер для изменения статуса пользователя (активация/деактивация)
exports.toggleUserStatus = (req, res) => {
  const userId = req.params.id;
  pool.query('UPDATE users SET is_active = NOT is_active WHERE id = $1', [userId], (error) => {
    if (error) {
      throw error;
    }
    res.redirect('/admin/manageUsers');
  });
};
