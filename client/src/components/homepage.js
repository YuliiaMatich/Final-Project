import React from 'react';
import RecipeContainer from './recipecontainer';

let arr = [0, 1, 2, 3, 4, 5];

const Homepage = function () {

  return (
  <div className="homepage-main">
  <img className='zoomout-img' style={{"WebkitAnimation": "zoomout 10s 1"}} src={require('../docs/homepagepic.jpg')} />
  <div className='homepage-body'>
    <div className='search-bar'>
    <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search for a recipe here" aria-label="Search" />
        <button className="btn btn-secondary" type="submit">Search</button>
      </form>
    </div>
  {arr.map(elem => <RecipeContainer />)}
  </div>
  </div>
 
  );
}

export default Homepage;