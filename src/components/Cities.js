import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import AddCityModal from "./AddCityModal";
import CitiesCard from "./CitiesCard";
import "./Cities.css";

const Cities = () => {
  const [cityDetails, setCityDetails] = useState([]);
  const [cityId, setCityId] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleCity, setVisibleCity] = useState(false);

  const addCity = () => {
    !visible ? setVisible(true) : setVisible(false);
  };

  useEffect(() => {
    onload();
  }, []);

  const onload = async () => {
    const result = await axios.get("http://localhost:3003/cities-data");
    const list = [];
    result.data.filter((iscity) => (iscity.isMyCity ? list.push(iscity) : ""));
    setCityDetails(list);
  };

  const visibleCityHandler = (id) => {
    setVisibleCity(true);
    setCityId(id);
  };

  const addNewCity = () => {
    onload();
  };

  return (
    <div className="container">
      <div className="cities">
        <div className="cities__header">
          <h3>Cities</h3>
          <AddCircleOutlineIcon className="cities__btn" onClick={addCity} />
        </div>
        <hr />
        {visible && (
          <AddCityModal closeHandler={addCity} addNewCity={addNewCity} />
        )}
        {cityDetails.length !== 0 ? (
          cityDetails.map((city) => (
            <div
              className="cities__body"
              key={city.id}
              onClick={() => visibleCityHandler(city.id)}
            >
              <p>{city.name}</p>
              <p>{city.temp}</p>
            </div>
          ))
        ) : (
          <p>You have not selected any city.</p>
        )}
      </div>
      {visibleCity && <CitiesCard id={cityId} />}
    </div>
  );
};

export default Cities;
