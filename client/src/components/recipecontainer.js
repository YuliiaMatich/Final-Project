import React from "react";

const RecipeContainer = function ({recipeTitle, recipeImg, recipeId, getSingleRecipe}) {
  const handleClick = function (event, recipeId) {
    event.preventDefault();
    getSingleRecipe(recipeId);
  };
  return (
    <div className="recipe-container" onClick={(event) => handleClick(event, recipeId)}>
      <img className="recipe-container-image" src={recipeImg} />
      <h4 className="recipe-container-text">{recipeTitle}</h4>
    </div>
  )
}

export default RecipeContainer;