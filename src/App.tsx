import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Recipes } from "./components/Recipes";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([])

  async function fetchRecipes() {
    const response = await fetch("http://localhost:8080/recipes/index.php");
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
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Recipes searchTerm={searchTerm} recipes={recipes} />
    </div>
  );
}

export default App;
