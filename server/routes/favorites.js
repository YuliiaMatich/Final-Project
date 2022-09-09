const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  router.get('/', (req, res) => {
    res.send("favorite page")
  })

  const getFavoriteForUser = function (user_id) {
    return db.
      query(`SELECT * from favorites
    WHERE user_id =$1`, [user_id])
      .then(res => {
        return res.rows
      })
  }
  router.get('/list', (req, res) => {
    getFavoriteForUser(req.session.userId)
      .then(favorites => {
        res.json({ favorites: favorites })
      })
  })


  const userHasFavoriteWithId = function (user_id, ext_recipe_id) {
    return db.
      query(`SELECT * from favorites
      WHERE user_id =$1 AND ext_recipe_id = $2;`, [user_id, ext_recipe_id])
      .then(res => {
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

  const userRemoveFavorite = function (user_id, ext_recipe_id) {
    return db.
      query(`Delete from favorites
      WHERE user_id =$1 AND ext_recipe_id = $2;`, [user_id, ext_recipe_id])
  }

  const addFavorite = function (favorite) {
    return db
      .query(`INSERT INTO favorites (user_id, ext_recipe_id, ext_recipe_title)
    VALUES ($1, $2, $3) RETURNING *;`, [favorite.user_id, favorite.ext_recipe_id, favorite.ext_recipe_title])
      .then(res => {
        return res.rows[0];
      })
      .catch(err => {
        console.log('error message', err.stack);
        return null;
      })
  }

  router.post('/', (req, res) => {
    const favorite = req.body;
    favorite.user_id = req.session.userId;
    // gets faviorite.ext_recipe_id and favorite.ext_recipe_title from req body
    userHasFavoriteWithId(req.session.userId, favorite.ext_recipe_id)
      .then((userHasThisFavorite) => {
        if (!userHasThisFavorite) {
          addFavorite(favorite)
            .then(favorite => {
              res.sendStatus(201);
              console.log({ favorite })
            })
            .catch(e => { return res.send(e) });
        } else {
          userRemoveFavorite(req.session.userId, favorite.ext_recipe_id)
            .then(favorite => {
              res.sendStatus(204);
              console.log({ favorite })
            })
            .catch(e => { return res.send(e) });
        }
      });

  });

  return router;
}