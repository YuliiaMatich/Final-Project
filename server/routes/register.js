var express = require('express');
var router = express.Router();

module.exports = (db) => {
  const getUserWithEmail = function (email) {
    return db.
      query(`SELECT * from users
      WHERE email = $1;`, [email])
      .then(res => {
        console.log("^^^", res.rows);
        if (res.rows.length === 0) {
          return false
        }
        return true;
      })
      .catch(err => {
        console.log('error message', err.stack);
        return false;
      })
  }
  const addUser = function (user) {
    return db
      .query(`INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *;`, [user.username, user.email, user.password])
      .then(res => { return res.rows[0] })
      .catch(err => {
        console.log('error message', err.stack);
        return null;
      })
  }

  //MOVE TO HOME.JS
  router.get("/", (req, res) => {
    res.send("register page!!")
  });
  // //////////

  router.post('/', (req, res) => {
    const user = req.body;
    // gets user.email and user.password from req body
    getUserWithEmail(user.email)
      .then((response) => {
        if (!response) {
          addUser(user)
            .then(user => {
              if (!user) {
                return res.send({ error: "error" });
              }
              console.log({ user })
              req.session.userId = user.id;
              req.session.userName = user.name;
            })
            .catch(e => { return res.send(e) });
        }
        res.json(user);
      });

  });

  return router;
};