import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RecipeItem.css";
import { useState } from "react";
import { RecipeDetail } from "./RecipeDetail";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const RecipeItem = ({ recipe, onDelete }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function deleteRecipe() {
    fetch("http://localhost:8080/recipes/index.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({ title: recipe.title }),
    })
      .then((response) => {
        if (!response.ok) {
          throw "Nastala chyba, skuste znova neskor.";
        }
        closeModal();
        onDelete()
      })
      .catch((error) => {
        alert(error);
      });
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
