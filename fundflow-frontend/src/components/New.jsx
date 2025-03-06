import React, { useState } from "react";
import "./New.css";

const New = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="container">
      <h2>Thousands are fundraising online on Milaap</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by fundraiser name, title, location, cause or other keywords"
        />
        <button className="search-button">
          <img src="search-icon.png" alt="Search" />
        </button>
      </div>
      <p className="error-message">Search can't be blank</p>

      <div className="categories">
        <div className="category medical">
          <img src="medical-icon.png" alt="Medical" className="category-icon" />
          <span>Medical</span>
        </div>
        <div className="category">
          <img src="memorials-icon.png" alt="Memorials" className="category-icon" />
          <span>Memorials</span>
        </div>
        <div className="category">
          <img src="non-profits-icon.png" alt="Non-profits" className="category-icon" />
          <span>Non-profits</span>
        </div>
        <div className="category" onClick={toggleDropdown}>
          <img src="more-icon.png" alt="More" className="category-icon" />
          <span>18 others</span>
          {showDropdown && (
            <div className="dropdown">
              <div className="dropdown-item">
                <img src="animal-icon.png" alt="Animal" />
                <span>Animal</span>
              </div>
              <div className="dropdown-item">
                <img src="women-icon.png" alt="Women" />
                <span>Women</span>
              </div>
              <div className="dropdown-item">
                <img src="children-icon.png" alt="Children" />
                <span>Children</span>
              </div>
              <div className="dropdown-item">
                <img src="emergency-icon.png" alt="Emergency" />
                <span>Emergency</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default New;
