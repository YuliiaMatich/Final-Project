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

  const getSingleRecipeForUser = function (id) {
    return db.
      query(`SELECT * from recipes
    WHERE id=$1`, [id])
      .then(res => {
        return res.rows
      })
  }


  router.get('/list/:userId', (req, res) => {
    const userId = req.params.userId
    getRecipeForUser(userId)
      .then(myrecipes => {
        res.json({ myrecipes: myrecipes })
      })
  })

  router.get('/recipelist/:myrecipeId', (req, res) => {
    const myrecipeId = req.params.myrecipeId
    getSingleRecipeForUser(myrecipeId)
      .then(myrecipe => {
        res.json({ myrecipe: myrecipe })
      })
  })

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
    addRecipe(recipe)
      .then(recipe => {
        res.sendStatus(201);
        console.log({ recipe })
      })
      .catch(e => { return res.send(e) });
  })

  return router;
}