const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const token = process.env.API_KEY;

const apiCall = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes/random'
});

const fetchFood = function(limitNumber) {
  return apiCall.get('/', {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      apiKey: token,
      number: limitNumber
    }
  })
  .then(response => {
    let randomRecipesData = [];
    for (let recipe of response.data.recipes) {
      let recipeData = {id: recipe.id, title: recipe.title, recipeImg: recipe.image};
      randomRecipesData.push(recipeData);
    }
    return randomRecipesData
  })
};

/* GET home page. */
router.get('/', (req, res) => {
  fetchFood(2).then(response => res.json(response));
})


module.exports = router;

