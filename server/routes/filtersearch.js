const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const token = process.env.API_KEY;

const apiCall = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes/complexSearch'
});

const fetchFood = function(limitNumber, filters) {
  let paramObject = {
    apiKey: token,
    number: limitNumber
  };

  for (let filter in filters) {
    paramObject[filter] = filters[filter];
  };

  return apiCall.get('/', {
    headers: {
      "Content-Type": "application/json"
    },
    params: paramObject
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
router.get('/', (req, res) => {
  console.log('get request received');
})

router.post('/', (req, res) => {
  const filters = req.body;
  fetchFood(6, filters).then(response => res.json(response));
})


module.exports = router;

