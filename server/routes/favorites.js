const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  router.get('/', (req, res) => {
    res.send("favorite page")
  })

  return router;
}