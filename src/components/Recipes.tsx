import "./Recipes.css";
import { RecipeItem } from "./RecipeItem";

export const Recipes = ({searchTerm, recipes, onDelete}) => {
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    })

  return (
    <div className="recipes-container">
      {filteredRecipes.map((recipe, index) => {
        return <RecipeItem key={index} recipe={recipe} onDelete={onDelete}/>;
      })}
    </div>
  );
};
