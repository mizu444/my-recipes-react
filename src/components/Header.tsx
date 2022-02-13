import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

export const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="header">
      <h1>My Recipes</h1>
      <button className="add-new-btn" id="add-new-btn">
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
    </header>
  );
};
