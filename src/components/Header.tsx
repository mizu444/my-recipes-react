import "./Header.css";
import Modal from "react-modal";
import { AddNewRecipe } from "./AddNewRecipe";

Modal.setAppElement("#root");

export const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="header">
      <h1>My Recipes</h1>
      <AddNewRecipe />
      <input
        value={searchTerm}
        type="search"
        className="search"
        placeholder="Search for your favourite recipe..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </header>
  );
};
