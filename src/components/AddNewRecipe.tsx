import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const AddNewRecipe = ({ onSubmitNewRecipe }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errorClass, setErrorClass] = useState({
    title: false,
    ingredients: false,
    directions: false,
  });
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [directions, setDirections] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setTitle("");
    setImage("");
    setIngredients([""]);
    setDirections("");
    setErrorClass({ title: false, ingredients: false, directions: false });
  }

  function submitRecipe() {
    const errors = {
      title: false,
      ingredients: false,
      directions: false,
    };
    // e.preventDefault();

    if (title.length === 0) {
      errors.title = true;
    }

    if (directions.length === 0) {
      errors.directions = true;
    }

    // odfiltrovat prazdne ingrediencie
    const filteredIngredients = ingredients
      .map((ingredient) => ingredient.trim())
      .filter((ingredient) => !!ingredient)
      .toString();

    // zistit, ci po filtri je dlzka > 1, ak nie zobraz error, na server posli len vyplnene policka
    if (filteredIngredients.length < 1) {
      errors.ingredients = true;
    }

    const newRecipe = {
      title,
      ingredients: filteredIngredients,
      directions,
      image,
    };

    fetch("http://localhost:8080/recipes/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams(newRecipe),
    }).then((response) => {
      if (!response.ok) {
        throw "Nastala chyba, skuste znova neskor.";
      }
      closeModal();
      onSubmitNewRecipe();
    })
    // .catch((error) => {
    //   alert(error);
    // });

    //----------- TODO - ak title uz existuje, vyhod chybu ----------//

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
                  {ingredients.length > 1 && (
                    <span
                      className="remove-ingredient"
                      onClick={() => {
                        const updatedArray = [...ingredients];
                        updatedArray.splice(index, 1);
                        setIngredients(updatedArray);
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  )}
                  <input
                    value={ingredient}
                    onChange={(e) => {
                      const value = e.target.value;
                      ingredients[index] = value;
                      setIngredients([...ingredients]);
                    }}
                    type="text"
                    className={
                      "input ingredients" +
                      (errorClass.ingredients ? " error" : "")
                    }
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
          {(errorClass.title ||
            errorClass.directions ||
            errorClass.ingredients) && (
            <div className="error-message" id="error-message">
              ta vypln sicko co mas!
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
