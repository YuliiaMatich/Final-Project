import React from "react";

const Recipe = function ({singleRecipe, setSingleRecipe}) {

  const handleClick = function (event) {
    event.preventDefault();
    setSingleRecipe(null);
  }
  return (
    <div className="single-recipe-page">
      <div className="recipe-title-photo">
        <h1 className="single-recipe-page-text">{singleRecipe.title}</h1>
        <img className="single-recipe-page-image" src={singleRecipe.image} />
      </div>
      <div className="recipe-features">
        <h5>Ready In Minutes: {singleRecipe.readyInMinutes}</h5>
        <h5>Servings: {singleRecipe.servings}</h5>
        <h5>Cuisine: {singleRecipe.cuisine}</h5>
        <h5>Dish Type: {singleRecipe.dishType}</h5>
        <h5><form>
          <label for="favorite" className="favorite"> Mark as Favorite: </label>
          <input type="checkbox" id="favorite" name="favorite" value="true" />
        </form></h5>
      </div>
      <div className="ingredients-instructions">
        <div className="ingredients">
          <h1>Ingredients</h1>
          {singleRecipe.ingredients.map(item => <p>- {item}</p>)}
        </div>
        <div className="instructions">
          <h1>Instructions</h1>
          {singleRecipe.steps.map(item => <p>- {item} </p>)}
        </div>
      </div>
      <div className="recipe-features back-button-field">
      <button type="button" className="btn btn-secondary back-button" onClick={handleClick}>Back</button>
      </div>
    </div>
  )
}

export default Recipe;