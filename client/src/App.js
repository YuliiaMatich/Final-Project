import './App.css';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import Info from './components/Info';
import Login from './components/Login';
import Register from './components/Register';
import { authContext } from './providers/AuthProvider';
// import CounterProvider from 'providers/CounterProvider';

export default function App() {
  const [randomRecipes, setRandomRecipes] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [menuSearchItem, setMenuSearchItem] = useState('');
  const [islogin, setIslogin] = useState(false);
  const [isregister, setIsregister] = useState(false);
  const { auth } = useContext(authContext);

  useEffect(() => {
    axios.get("/home")
      .then(res => setRandomRecipes(res.data))
  }, []);

  const keywordRecipeSearch = function (keyword) {
    return axios.get(`/${keyword}`)
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

  return (

    <div className="App">
      {/* <CounterProvider>      */}
      <Navbar
        menuSearchItem={menuSearchItem}
        setMenuSearchItem={setMenuSearchItem}
        cuisineSearch={cuisineSearch}
        mealTypeSearch={mealTypeSearch}
        islogin={setIslogin}
        isregister={setIsregister}
        />
      { auth ? <Info /> : islogin ? <Login open = {islogin} setOpen = {setIslogin}/> : <Register open = {isregister} setOpen = {setIsregister}/> }
      <Homepage
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        keywordRecipeSearch={keywordRecipeSearch}
        randomRecipes={randomRecipes}
      />
      
      {/* </CounterProvider> */}
    </div>
 
  );
}