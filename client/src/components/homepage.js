import React from 'react';
import RecipeContainer from './recipecontainer';

let arr = [0, 1, 2, 3, 4, 5];

const Homepage = function () {

  return (
    <div className="homepage-main">
      <img className='zoomout-img' style={{ "WebkitAnimation": "zoomout 10s 1" }} src={require('../docs/homepagepic.jpg')} />
      <div className='homepage-body'>
        <div className='search-bar'>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search for a recipe here" aria-label="Search" />
            <button className="btn btn-secondary" type="submit">Search</button>
          </form>
        </div>
        <div className='filters-recipes'>
          <div className='filters'>
            <form>
              <h3 className='filter-header'>Total Time</h3>
              <div className="form-check">
                <label className="form-check-label" htmlFor="totalTime">
                  Less than 30 minutes
                </label>
                <input className="form-check-input" value="30" type="radio" name="totalTime" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="totalTime">
                  Less than 1 hour
                </label>
                <input className="form-check-input" value="60" type="radio" name="totalTime" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="totalTime">
                  Less than 2 hours
                </label>
                <input className="form-check-input" value="120" type="radio" name="totalTime" />
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
                <label className="form-check-label" htmlFor="diets">
                  Gluten free
                </label>
                <input className="form-check-input" value="Gluten Free" type="radio" name="diets" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="diets">
                  Vegetarian
                </label>
                <input className="form-check-input" value="Vegetarian" type="radio" name="diets" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="diets">
                  Ketogenic
                </label>
                <input className="form-check-input" value="Ketogenic" type="radio" name="diets" />
              </div>
              <hr />

              <h3 className='filter-header'>Rating</h3>
              <div className="form-check">
                <label className="form-check-label" htmlFor="rating">
                  More than 4.5
                </label>
                <input className="form-check-input" value="4.5" type="radio" name="rating" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="rating">
                  More than 4
                </label>
                <input className="form-check-input" value="4" type="radio" name="rating" />
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="rating">
                  More than 3
                </label>
                <input className="form-check-input" value="3" type="radio" name="rating" />
              </div>
              <button className="btn btn-secondary filter-button" type="submit">Apply Filters</button>
            </form>
          </div>

          <div className='recipes'>
            {arr.map(elem => <RecipeContainer key={elem}/>)}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Homepage;