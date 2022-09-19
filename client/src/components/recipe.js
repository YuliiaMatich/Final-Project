import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from 'react';
import { authContext } from '../providers/AuthProvider';

const Recipe = function ({ singleRecipe, setSingleRecipe }) {
  const [matchfavorites, setMatchfavorites] = useState(false);

  const { auth } = useContext(authContext);
  const handleClick = function (event) {
    event.preventDefault();
    setSingleRecipe(null);
  }

  const handleShareClick = function (event, recipeid) {
    event.preventDefault();
    navigator.clipboard.writeText(`http://localhost:3000/?recipe=${recipeid}`);
    event.target.innerHTML = 'Link Copied!';
  }

  const matchFavorite = function (singleRecipe) {
    // event.preventDefault()
    const userString = localStorage.getItem("user")
    const user = JSON.parse(userString)
    axios.get(`/favorites/list/${user.id}`)
      .then((res) => {
        for (let fav of res.data.favorites) {
          if (fav.ext_recipe_id === singleRecipe.id) {
            return setMatchfavorites(true)
          } else {
            setMatchfavorites(false)
          }
        }
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    matchFavorite(singleRecipe)
  }, []);

  const onCheck = function (e) {
    e.preventDefault();

    // eslint-disable-next-line no-unused-expressions
    (matchfavorites === true)
      ? ((e.target.innerHTML = 'Add to Favorite'), setMatchfavorites(false))
      : ((e.target.innerHTML = 'Remove from Favorite'), setMatchfavorites(true))

    axios.post('/favorites', {
      ext_recipe_id: singleRecipe.id,
      ext_recipe_title: singleRecipe.title
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

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
        {auth
          ? (matchfavorites === false)
            ? <button type="button" style={{width: 190, 'background-color': 'blue'}} className="btn btn-secondary share-recipe-button" onClick={(event) => onCheck(event)}>Add to Favorites</button>
            : <button type="button" style={{width: 190, 'background-color': 'green'}} className="btn btn-secondary share-recipe-button" onClick={(event) => onCheck(event)}>Remove from Favorites</button>
          : <></>}
      </div>
      <div className="ingredients-instructions">
        <div className="ingredients">
          <h1>Ingredients</h1>
          {singleRecipe.ingredients.map((item, index) => <p key={index}>- {item}</p>)}
        </div>
        <div className="instructions">
          <h1>Instructions</h1>
          {singleRecipe.steps.map((item, index) => <p key={index}>- {item} </p>)}
        </div>
      </div>
      <div className="recipe-features bottom-buttons-field">
        <button type="button" className="btn btn-secondary back-button" onClick={handleClick}>Back</button>
        <button type="button" className="btn btn-secondary share-recipe-button" onClick={(event) => handleShareClick(event, singleRecipe.id)}>Share Recipe</button>
      </div>
    </div>
  )
}

export default Recipe;