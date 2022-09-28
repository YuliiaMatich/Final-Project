import React from "react";
import { useState } from 'react';
import axios from 'axios';

const MyRecipes = function ({ setOpenMyRecipe }) {
  const [myRecipeImage, setMyRecipeImage] = useState('')
  const [myRecipeTitle, setMyRecipeTitle] = useState('')
  const [myRecipeDescrip, setMyRecipeDescrip] = useState('')
  const [myRecipeIngred, setMyRecipeIngred] = useState('')
  const [myRecipeTime, setMyRecipeTime] = useState('')
  const [myRecipeCal, setMyRecipeCal] = useState('')
  const [myRecipeDiet, setMyRecipeDiet] = useState('')
  const [error, setError] = useState(false);

  const onImageHandler = function (event) {
    setMyRecipeImage(event.target.value);
  };
  const onTitleHandler = function (event) {
    setMyRecipeTitle(event.target.value);
  };
  const onDescripHandler = function (event) {
    setMyRecipeDescrip(event.target.value);
  };
  const onIngredHandler = function (event) {
    setMyRecipeIngred(event.target.value);
  };
  const onTimeHandler = function (event) {
    setMyRecipeTime(event.target.value);
  };
  const onCaloryHandler = function (event) {
    setMyRecipeCal(event.target.value);
  };
  const onDietHandler = function (event) {
    setMyRecipeDiet(event.target.value);
  };

  const onSubmit = function (event) {
    event.preventDefault();
    setOpenMyRecipe(true);

    if (myRecipeImage.length === 0 || myRecipeTitle.length === 0 || myRecipeDescrip.length === 0 || myRecipeIngred.length === 0 || myRecipeTime.length === 0 || myRecipeCal.length === 0 || myRecipeDiet.length === 0) {
      return setError("Please fill recipe form")
    }

    axios.post('/myrecipes', { 
      recipe_picture: myRecipeImage, 
      recipe_title: myRecipeTitle, 
      description: myRecipeDescrip, 
      ingredients: myRecipeIngred, 
      total_time: myRecipeTime, 
      max_calories: myRecipeCal, 
      diet: myRecipeDiet })
      .then((response) => {
        let recipeInfo = JSON.parse(response.config.data)
        console.log("JSON.parse", recipeInfo)
      })
      .catch((error) => {
        console.log("error.response.data", error.response.data)
        setError(error.response.data)
      });
      setMyRecipeImage('');
      setMyRecipeTitle('');
      setMyRecipeDescrip('');
      setMyRecipeIngred('');
      setMyRecipeTime('');
      setMyRecipeCal('');
      setMyRecipeDiet('');
  };

  return (

    <div>
      <img className="single-recipe-page-image" style={{ "width": "100%" }} src={'/docs/Ingredients.jpg'} />
      <form onSubmit={onSubmit}>
        <div>
          <label></label>
          <input type='myRecipeImage' name='myRecipeImage' placeholder="Image" style={{ "margin-top": "10px", "width": "60%" }} size="50" value={myRecipeImage} onChange={onImageHandler} />
        </div>
        <div>
          <label></label>
          <input type='myRecipeTitle' name='myRecipeTitle' placeholder="Title" style={{ "margin-top": "10px", "width": "60%" }} size="50" value={myRecipeTitle} onChange={onTitleHandler} />
        </div>
        <div>
          <label></label>
          <textarea type='myRecipeDescrip' name='myRecipeDescrip' placeholder="Recipe Description" style={{ "margin-top": "10px", "width": "60%" }} size="50" value={myRecipeDescrip} onChange={onDescripHandler} />
        </div>
        <div>
          <label></label>
          <textarea type='myRecipeIngred' name='myRecipeIngred' placeholder="Recipe Ingredients" style={{ "margin-top": "10px", "width": "60%" }} size="50" value={myRecipeIngred} onChange={onIngredHandler} />
        </div>
        <div>
          <label></label>
          <input type='myRecipeTime' name='myRecipeTime' placeholder="Recipe Time" style={{ "margin-top": "10px", "width": "60%" }} size="50" value={myRecipeTime} onChange={onTimeHandler} />
        </div>
        <div>
          <label></label>
          <input type='myRecipeCal' name='myRecipeCal' placeholder="Recipe Calories" style={{ "margin-top": "10px", "width": "60%" }} size="50" value={myRecipeCal} onChange={onCaloryHandler} />
        </div>
        <div>
          <label></label>
          <input type='myRecipeDiet' name='myRecipeDiet' placeholder="Recipe Diet" style={{ "margin-top": "10px", "width": "60%" }} size="50" value={myRecipeDiet} onChange={onDietHandler} />
        </div>
        <div>
          <button className="btn btn-secondary" style={{ "margin-top": "10px" }} type="submit">My Recipes {error} </button>
        </div>
      </form>
    </div>
  )
}

export default MyRecipes;