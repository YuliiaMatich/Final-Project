const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  router.get('/', (req, res) => {
    res.send("my recipe page")
  })

  const getRecipeForUser = function (user_id) {
    return db.
      query(`SELECT * from recipes
    WHERE user_id =$1`, [user_id])
      .then(res => {
        return res.rows
      })
  }

  router.get('/list/:userId', (req, res) => {
    const userId = req.params.userId
    getRecipeForUser(userId)
      .then(recipes => {
        res.json({ recipes: recipes })
      })
  })

  // const userHasRecipe = function (user_id, recipe_title) {
  //   return db.
  //     query(`SELECT * from recipes
  //     WHERE user_id =$1 AND recipe_title = $2;`, [user_id, recipe_title])
  //     .then(res => {
  //       if (res.rows.length === 0) {
  //         return false
  //       }
  //       return true;
  //     })
  //     .catch(err => {
  //       console.log('**UserHasRecipe error message', err.stack);
  //       return false;
  //     })
  // }

  // const userRemoveRecipe = function (user_id) {
  //   return db.
  //     query(`Delete from recipes
  //     WHERE user_id =$1`, [user_id])
  // }

  const addRecipe = function (recipe) {
    return db
      .query(`INSERT INTO recipes (user_id, recipe_picture, recipe_title, description, ingredients, total_time, max_calories, diet)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`, [recipe.user_id, recipe.recipe_picture, recipe.recipe_title, recipe.description, recipe.ingredients, recipe.total_time, recipe.max_calories, recipe.diet])
      .then(res => {
        console.log("$$res.rows[0]", res.rows[0])
        return res.rows[0];
      })
      .catch(err => {
        console.log('##error message err.stack', err.stack);
        return null;
      })
  }

  router.post('/', (req, res) => {
    const recipe = req.body;
    recipe.user_id = req.session.userId;
    console.log("$$req.body", req.body)
    console.log("$$req.session.userId", req.session.userId)
    // userHasRecipe(req.session.userId, recipe.recipe_title)
    //   .then((userHasThisRecipe) => {
    //     if (!userHasThisRecipe) {
    addRecipe(recipe)
      .then(recipe => {
        res.sendStatus(201);
        console.log({ recipe })
      })
      .catch(e => { return res.send(e) });
  })
  //   })
  // });

  return router;
}