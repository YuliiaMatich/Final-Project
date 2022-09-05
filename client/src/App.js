import './App.css';
import Navbar from './components/navbar';
import Homepage from './components/homepage';
import RecipeContainer from './components/recipecontainer';



function App() {
  return (
    <div className="App">
      <Navbar />
      <Homepage/>
    </div>
  );
}

export default App;
