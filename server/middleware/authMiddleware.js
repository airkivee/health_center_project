// Middleware для проверки аутентификации
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    console.log('Пользователь аутентифицирован:', req.session.user);
    return next();
  } else {
    console.log('Неавторизованная попытка доступа');
    res.status(401).send('Unauthorized');
  }
}

// Middleware для проверки роли пользователя
function ensureRole(role) {
  return (req, res, next) => {
    if (req.session.user && req.session.user.role === role) {
      console.log(`Пользователь имеет роль: ${role}`);
      return next();
    } else {
      console.log(`Доступ запрещен. Необходимая роль: ${role}. Текущая роль пользователя: ${req.session.user ? req.session.user.role : 'не определена'}`);
      res.status(403).send('Forbidden');
    }
  };
}

module.exports = { ensureAuthenticated, ensureRole };
