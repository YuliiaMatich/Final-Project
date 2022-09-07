var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  
  const getUserWithEmail = function (email) {
    return db.
      query(`SELECT * from users
      WHERE email = $1;`, [email])
      .then(res => res.rows[0])
      .catch(err => {
        console.log('error message', err.stack);
        return null;
      })
  }

  const login = function(email, password) {
    return getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        console.log('login success');
        return user;
      }
      return null;
    });
  }

  return router;
};

module.exports = router;