import "./Recipes.css";
import { RecipeItem } from "./RecipeItem";

export const Recipes = ({searchTerm, recipes}) => {
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    })

  return (
    <div className="recipes-container">
      {filteredRecipes.map((recipe, index) => {
        return <RecipeItem key={index} recipe={recipe} />;
      })}
    </div>
  );
};
