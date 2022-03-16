import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Recipes } from "./components/Recipes";

const apiHost = process.env.REACT_APP_API_HOST

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([])
  
  
  async function fetchRecipes() {
    const response = await fetch(`${apiHost}/recipes/index.php`);
    const data = await response.json();
    setRecipes(data.recipes)
  }

  useEffect(() => {
    document.title = "My Recipes";
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="main">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSubmitNewRecipe={fetchRecipes}/>
      <Recipes searchTerm={searchTerm} recipes={recipes} fetchRecipes={fetchRecipes}/>
    </div>
  );
}

export default App;
