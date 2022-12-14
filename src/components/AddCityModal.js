import React, { useState, useEffect } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import axios from "axios";
import AlertMessage from "./AlertMessage";
import "./AddCityModal.css";

const AddCityModal = ({ closeHandler, addNewCity }) => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    onload();
  }, [search]);

  const onload = async () => {
    const result = await axios.get("http://localhost:3003/cities-data");
    if (search === "") {
      setCities(result.data);
    } else {
      setCities(
        result.data.filter(
          (city) =>
            city.name.toLowerCase().includes(search) ||
            city.name.includes(search)
        )
      );
    }
  };

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const cityDetailsHandler = async (city) => {
    axios
      .patch(`http://localhost:3003/cities-data/${city.id}`, {
        isMyCity: true,
      })
      .then(() => {
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 1000);
        addNewCity();
        onload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="darkBG">
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Add City Modal</h5>
            <ClearIcon className="closeBtn" onClick={closeHandler} />
          </div>
          <input
            placeholder="search city"
            type="text"
            onChange={searchHandler}
          />
          <hr />
          <div className="modal__container">
            {cities.map((city) => (
              <div
                className="modalContent"
                key={city.id}
                style={{
                  visibility: !city.isMyCity ? "visible" : "hidden",
                  display: !city.isMyCity ? "" : "none",
                }}
              >
                <h3>{city.name}</h3>
                <AddCircleOutlineIcon
                  onClick={() => cityDetailsHandler(city)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {alertVisible && <AlertMessage text="City Added" />}
    </div>
  );
};

export default AddCityModal;
