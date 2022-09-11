const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const token = process.env.API_KEY;

const apiCall = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes/findByIngredients'
});

const fetchFood = function(myIngredients, limitNumber) {
  return apiCall.get(`/`, {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      apiKey: token,
      ingredients: myIngredients,
      number: limitNumber
    }
  })
  .then(response => {
    let myIngredientsSearch = [];
    for (let recipe of response.data) {
      let recipeData = {id: recipe.id, title: recipe.title, recipeImg: recipe.image};
      myIngredientsSearch.push(recipeData);
    }
    return myIngredientsSearch
  })
};

/* GET home page. */
router.get('/search', (req, res) => {
  const myIngredients = req.query.text;
  fetchFood(myIngredients, 4).then(response => res.json(response));
})


module.exports = router;

