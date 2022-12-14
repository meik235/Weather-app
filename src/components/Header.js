import React, { useState } from "react";
import AddCityModal from "./AddCityModal";
import "./Header.css";

const Header = () => {
  const [visible, setVisible] = useState(false);

  const addCity = () => {
    !visible ? setVisible(true) : setVisible(false);
  };

  const addNewCity = () => {};

  return (
    <div className="header">
      <h3 className="header__title">My Favorite cities</h3>
      <button onClick={addCity} className="header__button">
        Add New City
      </button>
      {visible && (
        <AddCityModal closeHandler={addCity} addNewCity={addNewCity} />
      )}
    </div>
  );
};

export default Header;
