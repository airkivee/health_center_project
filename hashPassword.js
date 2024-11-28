// hashPassword.js
const bcrypt = require('bcrypt');

const password = '30022051'; // Замените на ваш пароль
const saltRounds = 10; // Количество раундов соли

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed password:', hash);
    }
});