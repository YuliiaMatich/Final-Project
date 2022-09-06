import './App.css';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
  const [randomRecipes, setRandomRecipes] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8080/home")
    .then(res => setRandomRecipes(res.data))
  }, []);

  const keywordRecipeSearch = function(keyword) {
    return axios.get(`http://localhost:8080/keywordsearch/${keyword}`)
    .then(res => setRandomRecipes(res.data))
  }

  return (
    <div className="App">
      <Navbar />
      <Homepage
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        keywordRecipeSearch={keywordRecipeSearch}
        randomRecipes={randomRecipes}
      />
    </div>
  );
}

export default App;
