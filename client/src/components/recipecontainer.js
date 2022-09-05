import React from "react";

const RecipeContainer = function () {
  return (
    <div className="recipe-container" onClick={() => console.log('click')}>
      <img className="recipe-container-image" src={"https://spoonacular.com/recipeImages/632481-556x370.jpg"} />
      <h2 className="recipe-container-text">Apple Pie</h2>
    </div>
  )
}

export default RecipeContainer;