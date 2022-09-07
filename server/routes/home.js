const express = require('express');
const router = express.Router();
const axios = require('axios');

require('dotenv').config();
const token = process.env.API_KEY;

const apiCall = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes/complexSearch'
});

const fetchFood = function(searchParameter) {
  return apiCall.get('/', {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      apiKey: token,
      query: searchParameter
    }
  })
  .then(response => {
    console.log(response.data);
    return response.data
  })
};

/* GET home page. */
router.get('/', (req, res) => {
  // fetchFood("pasta").then(response => res.json(response));
})

module.exports = router;

