import React, { useState } from 'react';
import RecipeContainer from './recipecontainer';
import Loading from './loading';

const Homepage = function ({ randomRecipes, searchKeyword, setSearchKeyword, keywordRecipeSearch, lastResult, setLastResult, categoryPicture, setCategoryPicture, setFilterObject, filterSearch, filterObject, getSingleRecipe }) {
  const [emptyFieldAlert, setEmptyFieldAlert] = useState(null);
  const [emptyFilterAlert, setEmptyFilterAlert] = useState(null);

  const handleChange = function (event) {
    setSearchKeyword(event.target.value);
  };

  const handleFilterChange = function (event) {
    setFilterObject(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleFilterSubmit = function (event) {
    event.preventDefault();
    setLastResult('');
    if (Object.keys(filterObject).length) {
      setEmptyFilterAlert(null);
      filterSearch();
    } else {
      setEmptyFilterAlert('active');
    }
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    if (searchKeyword) {
      setEmptyFieldAlert(null);
      keywordRecipeSearch(searchKeyword);
      setCategoryPicture('/docs/homepagepic.jpg');
      setLastResult(searchKeyword);
      setSearchKeyword('');
    } else {
      setEmptyFieldAlert('active');
    }
    
  };

  return (
    <div className="homepage-main">
      {<img className='zoomout-img' style={{ "WebkitAnimation": "zoomout 10s 1" }} src={categoryPicture} />}
      <div className='homepage-body'>
        <div className='search-bar'>
          <form onSubmit={handleSubmit} className="d-flex" role="search">
            <input onChange={handleChange} value={searchKeyword} className="form-control me-2" type="search" placeholder="Search for a recipe here" aria-label="Search" />
            <button className="btn btn-secondary" type="submit">Search</button>
          </form>
        </div>
        {emptyFieldAlert?<div class="alert alert-danger search-alert" role="alert">
              Input cannot be empty.
            </div>:''}
        <p>{lastResult ? `Results by keyword '${lastResult}':` : ''}</p>
        <div className='filters-recipes'>
          <div className='filters'>
            <form onChange={handleFilterChange} onSubmit={handleFilterSubmit}>
              <h3 className='filter-header'>Total Time</h3>
              <div className="form-check">
                <label className="form-check-label" htmlFor="maxReadyTime">
                  Less than 30 minutes
                </label>
                <input className="form-check-input" value="30" type="radio" name="maxReadyTime" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="maxReadyTime">
                  Less than 1 hour
                </label>
                <input className="form-check-input" value="60" type="radio" name="maxReadyTime" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="maxReadyTime">
                  Less than 2 hours
                </label>
                <input className="form-check-input" value="120" type="radio" name="maxReadyTime" />
              </div>
              <hr />

              <h3 className='filter-header'>Max Calories</h3>
              <div className="form-check">
                <label className="form-check-label" htmlFor="maxCalories">
                  Less than 500
                </label>
                <input className="form-check-input" value="500" type="radio" name="maxCalories" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="maxCalories">
                  Less than 1000
                </label>
                <input className="form-check-input" value="1000" type="radio" name="maxCalories" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="maxCalories">
                  Less than 2000
                </label>
                <input className="form-check-input" value="2000" type="radio" name="maxCalories" />
              </div>
              <hr />

              <h3 className='filter-header'>Diets</h3>
              <div className="form-check">
                <label className="form-check-label" htmlFor="diet">
                  Gluten free
                </label>
                <input className="form-check-input" value="Gluten Free" type="radio" name="diet" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="diet">
                  Vegetarian
                </label>
                <input className="form-check-input" value="Vegetarian" type="radio" name="diet" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="diet">
                  Ketogenic
                </label>
                <input className="form-check-input" value="Ketogenic" type="radio" name="diet" />
              </div>
              <hr />

              <button className="btn btn-secondary filter-button" type="submit">Apply Filters</button>
              {emptyFilterAlert?<div class="alert alert-danger" role="alert">
              Please choose at least one filter criteria.
            </div>:''}
            </form>
            
          </div>
          

          <div className='recipes'>
            {randomRecipes ? randomRecipes.map(recipe => <RecipeContainer
              recipeTitle={recipe.title}
              recipeId={recipe.id}
              recipeImg={recipe.recipeImg}
              getSingleRecipe={getSingleRecipe}
              key={recipe.id} />) : <Loading />}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Homepage;