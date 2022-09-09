import React from 'react';
import { useContext, useState } from 'react';
import { authContext } from '../providers/AuthProvider';
import Info from './Info';
import axios from "axios";

const Navbar = function ({ setMenuSearchItem, cuisineSearch, mealTypeSearch, islogin, isregister, setLastResult, setCategoryPicture, setSingleRecipe, getSingleRecipe }) {
  const { auth } = useContext(authContext);
  const [favorites, setFavorites] = useState([]);

  const handleClickCuisine = function (event) {
    event.preventDefault()
    setMenuSearchItem(event.target.innerText);
    setCategoryPicture(`/docs/${event.target.innerText.replace(/\s/g, '')}.jpg`);
    cuisineSearch(event.target.innerText);
    setLastResult(null);
    setSingleRecipe(null);
  }

  const handleClickMealType = function (event) {
    event.preventDefault()
    setMenuSearchItem(event.target.innerText);
    setCategoryPicture(`/docs/${event.target.innerText.replace(/\s/g, '')}.jpg`);
    mealTypeSearch(event.target.innerText);
    setLastResult(null);
    setSingleRecipe(null)
  }

  const handleHomeClick = function (event) {
    event.preventDefault();
    setSingleRecipe(null);
  }

  const handleClickLogin = function (event) {
    event.preventDefault()
    islogin(true)
    isregister(false)
  }

  const handleClickRegister = function (event) {
    event.preventDefault()
    islogin(false)
    isregister(true)
  }

  const handleClickFavorite = function (event) {
    event.preventDefault()

    axios.get("/favorites/list")
      .then((res) => {
        setFavorites(res.data.favorites)
      })
      .catch((error) => {
      });
  };

  const selectFavorite = function (recipe) {
    getSingleRecipe(recipe.ext_recipe_id)
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid w-75">
        <a className="navbar-brand">Cooking App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav" >
            <li className="nav-item">
              <a onClick={handleHomeClick} className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Meal Type
              </a>
              <ul className="dropdown-menu">
                <li><a onClick={handleClickMealType} className="dropdown-item" href="#">Main Course</a></li>
                <li><a onClick={handleClickMealType} className="dropdown-item" href="#">Salad</a></li>
                <li><a onClick={handleClickMealType} className="dropdown-item" href="#">Appetizer</a></li>
                <li><a onClick={handleClickMealType} className="dropdown-item" href="#">Dessert</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Cuisine
              </a>
              <ul className="dropdown-menu">
                <li><a onClick={handleClickCuisine} className="dropdown-item" href="#">American</a></li>
                <li><a onClick={handleClickCuisine} className="dropdown-item" href="#">Asian</a></li>
                <li><a onClick={handleClickCuisine} className="dropdown-item" href="#">European</a></li>
                <li><a onClick={handleClickCuisine} className="dropdown-item" href="#">Middle Eastern</a></li>

              </ul>

            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">Recipe With My Ingredients</a>
            </li>
            {auth ?
              <>
                {/* <li className="nav-item dropdown" > */}
                <li className="nav-item dropdown" onClick={handleClickFavorite}>
                  <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Favorites</a>
                  <ul className="dropdown-menu">
                    {favorites.map(favorite => <li key={favorite.id}>
                      <a href="#" onClick={() => selectFavorite(favorite)}> {favorite.ext_recipe_title} </a>
                    </li>)}
                  </ul>
                </li>
              </>
              : <></>}
          </ul>
        </div>
      </div>
      <ul className="navbar-nav">
        {auth ? <li><Info /></li> : <><li>
          <a onClick={handleClickLogin} className="nav-link active" href="#">Login</a>
        </li>
          <li >
            <a onClick={handleClickRegister} className="nav-link active nav-link-active" href="#">Registration</a>
          </li>
        </>
        }

      </ul>
    </nav>
  );
}

export default Navbar;