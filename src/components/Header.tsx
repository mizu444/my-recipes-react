import "./Header.css";
import Modal from "react-modal";
import { AddNewRecipe } from "./AddNewRecipe";

Modal.setAppElement("#root");

export const Header = ({ searchTerm, setSearchTerm, onSubmitNewRecipe }) => {
  return (
    <header className="header">
      <h1>My Recipes</h1>
      <AddNewRecipe onSubmitNewRecipe={onSubmitNewRecipe}/>
      <input
        value={searchTerm}
        type="search"
        className="search"
        placeholder="What do you want to cook today?"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </header>
  );
};
