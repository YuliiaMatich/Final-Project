import './App.css';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import Recipe from './components/recipe';
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
  const [randomRecipes, setRandomRecipes] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [menuSearchItem, setMenuSearchItem] = useState('');
  const [lastResult, setLastResult] = useState(null);
  const [categoryPicture, setCategoryPicture] = useState('/docs/homepagepic.jpg');
  const [filterObject, setFilterObject] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/home")
    .then(res => setRandomRecipes(res.data))
  }, []);

  const keywordRecipeSearch = function(keyword) {
    return axios.get(`http://localhost:8080/keywordsearch/${keyword}`)
    .then(res => setRandomRecipes(res.data))
  }

  const cuisineSearch = function(keyword) {
    return axios.get(`http://localhost:8080/cuisinesearch/${keyword}`)
    .then(res => setRandomRecipes(res.data))
  }

  const mealTypeSearch = function(keyword) {
    return axios.get(`http://localhost:8080/mealtypesearch/${keyword}`)
    .then(res => setRandomRecipes(res.data))
  }
  
  const filterSearch = function() {
    return axios.post(`http://localhost:8080/filtersearch`, filterObject)
    .then(res => setRandomRecipes(res.data))
  }

  return (
    <div className="App">
      <Navbar 
      menuSearchItem={menuSearchItem}
      setMenuSearchItem={setMenuSearchItem}
      cuisineSearch={cuisineSearch}
      mealTypeSearch={mealTypeSearch}
      setLastResult={setLastResult}
      setCategoryPicture={setCategoryPicture}
      />
      <Homepage
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
      />
    <Recipe
    
    />
    </div>
  );
}

export default App;
