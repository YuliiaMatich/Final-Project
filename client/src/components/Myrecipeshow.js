import React from "react";
// import axios from "axios";
// import { useContext, useState, useEffect } from 'react';
// import { authContext } from '../providers/AuthProvider';

const MyRecipeShow = function ({ singleMyRecipe, setSingleMyRecipe }) {

  const handleClick = function (event) {
    event.preventDefault();
    setSingleMyRecipe(null);
  }
  let singleMR = singleMyRecipe.myrecipe[0]
  
  return (
    <div className="single-recipe-page">
      <div className="recipe-title-photo">
        <h1 className="single-recipe-page-text">{singleMR.recipe_title}</h1>
        <img className="single-recipe-page-image" src={singleMR.recipe_picture} />
      </div>
      <div className="recipe-features">
        <h5>Ready In Minutes: {singleMR.total_time}</h5>
        <h5>Calories: {singleMR.max_calories}</h5>
        <h5>Diet: {singleMR.diet}</h5>
      </div>
      <div className="ingredients-instructions">
        <div className="ingredients">
          <h1>Ingredients</h1>
          {singleMR.ingredients}
        </div>
        <div className="instructions">
          <h1>Instructions</h1>
          {singleMR.description}
        </div>
      </div>
      <div className="recipe-features bottom-buttons-field">
        <button type="button" className="btn btn-secondary back-button" onClick={handleClick}>Back</button>
      </div>
    </div>
  )
}

export default MyRecipeShow;