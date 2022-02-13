import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RecipeItem.css";
import { useState } from "react";
import { RecipeDetail } from "./RecipeDetail";

export const RecipeItem = ({ recipe }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="recipe">
      <h3 className="title" onClick={openModal}>
        {recipe.title}
      </h3>
      <img src={recipe.image} />
      <FontAwesomeIcon icon={faTrashAlt} className="delete" />
      <FontAwesomeIcon icon={faPencilAlt} className="edit" />
      <RecipeDetail
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        recipe={recipe}
      />
    </div>
  );
};
