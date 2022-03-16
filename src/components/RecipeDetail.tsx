import Modal from "react-modal";

Modal.setAppElement("#root");

export const RecipeDetail = ({ recipeDetailIsOpen, closeRecipeDetail, recipe }) => {
  return (
    <Modal
      isOpen={recipeDetailIsOpen}
      onRequestClose={closeRecipeDetail}
      style={{
        content: {
          backgroundColor: "rgb(243, 237, 182)",
          border: "2px solid rgb(233, 223, 82)",
          width: "60%",
          margin: "8% auto",
          height: "auto",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <span
        className="close-modal-btn"
        id="close-modal-btn"
        onClick={closeRecipeDetail}
      >
        &times;
      </span>
      
      <h3 className="title" id="modalTitle">
        {recipe.title}
      </h3>
      <div className="ingredients">
        <span>Ingredients:</span>
        <ul id="modalIngredients">
          {recipe.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>;
          })}
        </ul>
      </div>
      <div className="directions" id="modalDirections">
        {recipe.directions}
      </div>
    </Modal>
  );
};
