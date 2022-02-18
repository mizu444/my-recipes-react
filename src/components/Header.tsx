import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./Header.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const Header = ({ searchTerm, setSearchTerm }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <header className="header">
      <h1>My Recipes</h1>
      <button className="add-new-btn" id="add-new-btn" onClick={openModal}>
        Add New
        <FontAwesomeIcon
          icon={faPlusCircle}
          style={{ fontSize: "14px", marginLeft: "6px" }}
        />
      </button>
      <input
        value={searchTerm}
        type="search"
        className="search"
        placeholder="Search for your favourite recipe..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
              type="text"
              className="input title"
              id="input-title"
              placeholder="Enter title of the recipe"
            />
            <input
              type="text"
              className="input title"
              id="input-img"
              placeholder="Enter image url"
            />

            <div className="ingredients-list">
              <div className="ingredient-container">
                <span className="remove-ingredient">
                  <FontAwesomeIcon icon={faTimes} />
                </span>
                <input
                  type="text"
                  className="input ingredients"
                  placeholder="Enter ingredient"
                />
                   <span className="plus-ingredient">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </span>
              </div>
            </div>

            <textarea
              className="input directions"
              id="input-directions"
              placeholder="Enter directions"
            ></textarea>
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <div className="error-message" id="error-message"></div>
          </div>
      </Modal>
    </header>
  );
};
