const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const token = process.env.API_KEY;

const apiCall = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes/complexSearch'
});

const fetchFood = function(limitNumber, keyword) {
  return apiCall.get('/', {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      apiKey: token,
      cuisine: keyword,
      number: limitNumber
    }
  })
  .then(response => {
    let keywordRecipeSearch = [];
    for (let recipe of response.data.results) {
      let recipeData = {id: recipe.id, title: recipe.title, recipeImg: recipe.image};
      keywordRecipeSearch.push(recipeData);
    }
    return keywordRecipeSearch
  })
};

/* GET home page. */
router.get('/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  fetchFood(6, keyword).then(response => res.json(response));
})


module.exports = router;

