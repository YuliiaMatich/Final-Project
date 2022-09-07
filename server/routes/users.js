const router = require('express').Router();

module.exports = (db) => {
  
router.get('/', (req, res) => {
  res.send("user page")
})

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
    if (password === user.password) {
      console.log('login success');
      return user;
    }
    return null;
  });
}

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log("+++++", req.body);
  login(email, password)
    .then(user => {
      if (!user) {
        // res.status(400).send({error: "Invalid email or password"});
        res.status(400).send("Invalid email or password"); 
        return;
      }
  
  req.session.userId = user.id;
  req.session.userName = user.name;

  res.json(user);
});
});

// router.post('/logout', (req, res) => {
//   req.session = null;
//   // res.redirect('/login');
// })
return router;
}