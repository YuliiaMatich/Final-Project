import React, { useState } from 'react';
import RecipeContainer from './recipecontainer';

const MyIngredients = function ({ searchMyIngre, setSearchMyIngre, myIngredient, getMyIngredients, getSingleRecipe}) {
  const [emptyMyIngreAlert, setEmptyMyIngreAlert] = useState(null);
  const handleMyRecSubmit = function (event) {
    event.preventDefault();
    if (searchMyIngre) {
      setEmptyMyIngreAlert(null);
      setSearchMyIngre('');
      getMyIngredients(searchMyIngre);
    } else {
      setEmptyMyIngreAlert('active');
    }
  };

  const handleChange = function (event) {
    setSearchMyIngre(event.target.value);
  };
  return (
    <div className="myingredients-page">
      <div className="myingredients-photo">
        <img className="single-recipe-page-image" style={{ "width": "100%"}} src={'/docs/Ingredients.jpg'} />
      </div>
      <div className='search-bar'>
          <form onSubmit={handleMyRecSubmit} className="d-flex" role="search">
            <input onChange={handleChange} value={searchMyIngre} className="form-control me-2" type="search" placeholder="Enter your comma-separated ingredients (e.g. apples, flour, sugar)" aria-label="Search" />
            <button className="btn btn-secondary" type="submit">Search</button>
          </form>
        </div>
        {emptyMyIngreAlert?<div class="alert alert-danger search-alert" role="alert">
              Input cannot be empty.
            </div>:''}
      <div className='recipes'>
        {myIngredient ? myIngredient.map(myIngreRecipe => <RecipeContainer
          recipeTitle={myIngreRecipe.title}
          recipeId={myIngreRecipe.id}
          recipeImg={myIngreRecipe.recipeImg}
          getSingleRecipe={getSingleRecipe}
          key={myIngreRecipe.id} />) : <></>}
      </div>
    </div>
  )

}
export default MyIngredients;