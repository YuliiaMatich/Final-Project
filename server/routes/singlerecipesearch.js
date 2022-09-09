const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const token = process.env.API_KEY;

const apiCall = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes'
});

const fetchFood = function(recipeId) {
  return apiCall.get(`/${recipeId}/information`, {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      apiKey: token
    }
  })
  .then(resp => {
    let response = resp.data;
    let recipeData = {
      id: response.id, 
      title:response.title,
      image: response.image,
      readyInMinutes: response.readyInMinutes,
      servings: response.servings,
      cuisine: response.cuisines[0],
      dishType: response.dishTypes[0],
      diet: response.diets[0],
      ingredients: [],
      steps: []
    };
    if (response.instructions === null) {
      recipeData.steps.push('Instruction Unavailable');
    } else {
      for (let stepObj of response.analyzedInstructions[0].steps) {
        recipeData.steps.push(stepObj.step);
      };
    }

    if (!response.extendedIngredients) {
      recipeData.ingredients.push('Ingredients Unavailable');
    } else {
      for (let ingredient of response.extendedIngredients) {
    recipeData.ingredients.push(ingredient.original);
    }
  };
  
    return recipeData;
  })
};

/* GET home page. */
router.get('/:recipeId', (req, res) => {
  const recipeId = req.params.recipeId;
  fetchFood(recipeId).then(response => res.json(response));
})


module.exports = router;

