import './App.css';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import Recipe from './components/recipe';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import Info from './components/Info';
import Login from './components/Login';
import Register from './components/Register';
import MyIngredients from './components/Myingredient';
import { authContext } from './providers/AuthProvider';
import MyRecipes from './components/Myrecipes';

export default function App() {
  const [randomRecipes, setRandomRecipes] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [menuSearchItem, setMenuSearchItem] = useState('');
  const [islogin, setIslogin] = useState(false);
  const [isregister, setIsregister] = useState(false);
  const { auth } = useContext(authContext);
  const [lastResult, setLastResult] = useState(null);
  const [categoryPicture, setCategoryPicture] = useState('/docs/homepagepic.jpg');
  const [filterObject, setFilterObject] = useState({});
  const [singleRecipe, setSingleRecipe] = useState(null);
  const [searchMyIngre, setSearchMyIngre] = useState('');
  const [myIngredient, setMyIngredient] = useState(null);
  const [openMyIngredient, setOpenMyIngredient] = useState(false);
  const [openMyRecipe, setOpenMyRecipe] = useState(false);

  useEffect(() => {
    const userObj = localStorage.getItem("user")
    if (userObj) {
      setIslogin(true);
    }
    axios.get("/home")
      .then(res => setRandomRecipes(res.data))
  }, []);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sharedRecipeId = urlParams.get('recipe');

  const homeButtonClick = function () {
    return axios.get("/home")
      .then(res => setRandomRecipes(res.data))
  }

  // const logoutButtonClick = function () {
  //   return axios.get("/home")
  //     .then(res => setRandomRecipes(res.data))
  // }

  const keywordRecipeSearch = function (keyword) {
    return axios.get(`/keywordrecipessearch/${keyword}`)
      .then(res => setRandomRecipes(res.data))
  }

  const cuisineSearch = function (keyword) {
    return axios.get(`/cuisinesearch/${keyword}`)
      .then(res => setRandomRecipes(res.data))
  }

  const mealTypeSearch = function (keyword) {
    return axios.get(`/mealtypesearch/${keyword}`)
      .then(res => setRandomRecipes(res.data))
  }

  const filterSearch = function () {
    return axios.post(`/filtersearch`, filterObject)
      .then(res => setRandomRecipes(res.data))
  }

  const getSingleRecipe = (recipeId) => {
    return axios.get(`/singlerecipesearch/${recipeId}`)
      .then(res => setSingleRecipe(res.data))
  }

  const getMyIngredients = function (myIngredients) {
    return axios.get(`/myingredient/search?text=${myIngredients}`)
      .then(res => setMyIngredient(res.data))
  }


  if (sharedRecipeId) {
    getSingleRecipe(sharedRecipeId)
      .then(() => window.history.pushState({}, document.title, window.location.pathname))
  }

  return (

    <div className="App">
      <Navbar
        menuSearchItem={menuSearchItem}
        setMenuSearchItem={setMenuSearchItem}
        cuisineSearch={cuisineSearch}
        mealTypeSearch={mealTypeSearch}
        islogin={setIslogin}
        isregister={setIsregister}
        setLastResult={setLastResult}
        setCategoryPicture={setCategoryPicture}
        setSingleRecipe={setSingleRecipe}
        getSingleRecipe={getSingleRecipe}
        homeButtonClick={homeButtonClick}
        setOpenMyIngredient={setOpenMyIngredient}
        setOpenMyRecipe={setOpenMyRecipe}
      // logoutButtonClick={logoutButtonClick}
      />

      {auth
        ? <Info />
        : islogin
          ? <Login
            open={islogin}
            setOpen={setIslogin} />
          : <Register
            open={isregister}
            setOpen={setIsregister} />}

      {!singleRecipe && !openMyIngredient && !openMyRecipe && <Homepage
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        keywordRecipeSearch={keywordRecipeSearch}
        randomRecipes={randomRecipes}
        lastResult={lastResult}
        setLastResult={setLastResult}
        categoryPicture={categoryPicture}
        setCategoryPicture={setCategoryPicture}
        setFilterObject={setFilterObject}
        filterSearch={filterSearch}
        filterObject={filterObject}
        getSingleRecipe={getSingleRecipe}
      />}

      {openMyIngredient && !singleRecipe && !openMyRecipe && <MyIngredients
        searchMyIngre={searchMyIngre}
        setSearchMyIngre={setSearchMyIngre}
        myIngredient={myIngredient}
        setMyIngredient={setMyIngredient}
        getMyIngredients={getMyIngredients}
        getSingleRecipe={getSingleRecipe}
      />}

      {openMyRecipe && !singleRecipe && <MyRecipes
        setOpenMyRecipe={setOpenMyRecipe}
      />}

      {singleRecipe && <Recipe
        key={singleRecipe.id}
        singleRecipe={singleRecipe}
        setSingleRecipe={setSingleRecipe}
      />}

    </div>
  );
}