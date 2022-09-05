import './App.css';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
  const [randomRecipes, setRandomRecipes] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/home")
    .then(res => setRandomRecipes(res.data))
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Homepage
        randomRecipes={randomRecipes}
      />
    </div>
  );
}

export default App;
