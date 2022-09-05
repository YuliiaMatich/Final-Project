import React from "react";

const RecipeContainer = function ({recipeTitle, recipeImg}) {
  return (
    <div className="recipe-container" onClick={() => console.log('click')}>
      <img className="recipe-container-image" src={recipeImg} />
      <h4 className="recipe-container-text">{recipeTitle}</h4>
    </div>
  )
}

export default RecipeContainer;