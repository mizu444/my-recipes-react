import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const AddNewRecipe = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errorClass, setErrorClass] = useState({
    title: false,
    directions: false,
  });
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState(["banana", "nutella"]);
  const [directions, setDirections] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function submitRecipe(e) {
    const errors = {
      title: false,
      directions: false,
    };
    // e.preventDefault();

    if (title.length === 0) {
      errors.title = true;

      console.log("vypln nazov more", errorClass);
    }

    if (directions.length === 0) {
      errors.directions = true;
      console.log("chyba postup", errorClass);
    }

    setErrorClass(errors);
  }

  return (
    <div>
      <button className="add-new-btn" id="add-new-btn" onClick={openModal}>
        Add New
        <FontAwesomeIcon
          icon={faPlusCircle}
          style={{ fontSize: "14px", marginLeft: "6px" }}
        />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
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
          onClick={closeModal}
        >
          &times;
        </span>

        <div className="modal-content">
          <h3>Create new recipe</h3>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className={"input title" + (errorClass.title ? " error" : "")}
            id="input-title"
            placeholder="Enter title of the recipe"
          />
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            className="input image"
            id="input-img"
            placeholder="Enter image url"
          />

          <div className="ingredients-list">
            {ingredients.map((ingredient, index) => {
              return (
                <div className="ingredient-container" key={index}>
                  {ingredients.length > 1 &&<span
                    className="remove-ingredient"
                    onClick={() => {
                        const updatedArray = [...ingredients]
                        updatedArray.splice(index, 1)
                     setIngredients(updatedArray)
                    }
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>}
                  <input
                    value={ingredient}
                    onChange={(e) => {
                      const value = e.target.value;
                      ingredients[index] = value;
                      setIngredients([...ingredients]);
                    }}
                    type="text"
                    className="input ingredients"
                    placeholder="Enter ingredient"
                  />
                  {index === ingredients.length - 1 && (
                    <span className="plus-ingredient">
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        onClick={() => setIngredients([...ingredients, ""])}
                      />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <textarea
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
            className={
              "input directions" + (errorClass.directions ? " error" : "")
            }
            id="input-directions"
            placeholder="Enter directions"
          ></textarea>
          <button type="submit" className="submit-btn" onClick={submitRecipe}>
            Submit
          </button>
          <div className="error-message" id="error-message"></div>
        </div>
      </Modal>
    </div>
  );
};
