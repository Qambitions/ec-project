import "./style.css";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
const SEARCH_URL = "/product/search";

export default function SearchBar() {
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("searchBtn").click();
    }
  };
  const toggleSearch = () => {
    navigate(`/search/${document.getElementById("searchField").value}`, {
      replace: true,
    });
  };

  return (
    <div className="search-bar">
      <input
        id="searchField"
        className="search-bar-search-field"
        placeholder="Tìm kiếm"
        spellCheck="false"
        onKeyPress={handleKeyPress}
      ></input>
      <div className="search-icon" onClick={toggleSearch} id="searchBtn">
        <BsSearch />
      </div>
    </div>
  );
}
