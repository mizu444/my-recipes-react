import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RecipeItem.css";
import { useState } from "react";
import { RecipeDetail } from "./RecipeDetail";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { EditRecipe } from "./EditRecipe";

const apiHost = process.env.REACT_APP_API_HOST;

export const RecipeItem = ({ recipe, fetchRecipes }) => {
  const [recipeDetailIsOpen, setRecipeDetailIsOpen] = useState(false);
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);

  function openRecipeDetail() {
    setRecipeDetailIsOpen(true);
  }

  function closeRecipeDetail() {
    setRecipeDetailIsOpen(false);
  }

  function openEditForm() {
    setEditFormIsOpen(true);
  }

  function closeEditForm() {
    setEditFormIsOpen(false);
  }

  async function deleteRecipe() {
    try {
      const response = await fetch(`${apiHost}/recipe/${recipe.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({ title: recipe.title }),
      });
      if (!response.ok) {
        throw "Nastala chyba, skuste znova neskor.";
      }
      closeRecipeDetail();
      fetchRecipes();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="recipe">
      <h3 className="title" onClick={openRecipeDetail}>
        {recipe.title}
      </h3>
      <img src={recipe.image} />
      <FontAwesomeIcon
        icon={faTrashAlt}
        className="delete"
        onClick={() => {
          confirmAlert({
            message: "Are you sure you want to delete this recipe?",
            buttons: [
              {
                label: "Yes",
                onClick: deleteRecipe,
              },
              {
                label: "No",
                onClick: closeRecipeDetail,
              },
            ],
          });
        }}
      />
      <FontAwesomeIcon
        icon={faPencilAlt}
        className="edit"
        onClick={openEditForm}
      />
      <EditRecipe
        editFormIsOpen={editFormIsOpen}
        closeEditForm={closeEditForm}
        recipe={recipe}
        fetchRecipes={fetchRecipes}
      />
      <RecipeDetail
        recipeDetailIsOpen={recipeDetailIsOpen}
        closeRecipeDetail={closeRecipeDetail}
        recipe={recipe}
      />
    </div>
  );
};
