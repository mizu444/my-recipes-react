import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RecipeItem.css";
import { useState } from "react";
import { RecipeDetail } from "./RecipeDetail";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const apiHost = process.env.REACT_APP_API_HOST;

export const RecipeItem = ({ recipe, onDelete }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function deleteRecipe() {
    try {
      const response = await fetch(`${apiHost}/recipes/index.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({ title: recipe.title }),
      });
      if (!response.ok) {
        throw "Nastala chyba, skuste znova neskor.";
      }
      closeModal();
      onDelete();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="recipe">
      <h3 className="title" onClick={openModal}>
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
                onClick: closeModal,
              },
            ],
          });
        }}
      />
      <FontAwesomeIcon icon={faPencilAlt} className="edit" />
      <RecipeDetail
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        recipe={recipe}
      />
    </div>
  );
};
