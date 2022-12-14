import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import "./CitiesCard.css";

const CitiesCard = ({ id }) => {
  const [cityInfo, setCityInfo] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    onload(id);
  }, [id]);

  const onload = (idonload) => {
    axios
      .get(`http://localhost:3003/cities-data/${idonload}`)
      .then((response) => {
        setCityInfo(response.data);
      })
      .catch((error) => console.log(error));
  };

  const addFavoriteHandler = async (data) => {
    isFavorite ? setIsFavorite(true) : setIsFavorite(false);
    await favoriteHandler(data);
  };

  const favoriteHandler = async (citydata) => {
    !citydata.isFavorite
      ? await axios.patch(`http://localhost:3003/cities-data/${citydata.id}`, {
          isFavorite: true,
        })
      : await axios.patch(`http://localhost:3003/cities-data/${citydata.id}`, {
          isFavorite: false,
        });
    onload();
  };

  return (
    <div className="city__details" key={cityInfo.id}>
      <div
        className={
          cityInfo.isFavorite ? "cities__header favorite" : "cities__header"
        }
      >
        <h3>{cityInfo.name}</h3>
        <StarIcon
          className="cities__btn"
          onClick={() => addFavoriteHandler(cityInfo)}
        />
      </div>
      <hr />
      <div className="city__card">
        <h4>{cityInfo.desc}</h4>
        <p>
          <b>Temperature:</b> {cityInfo.temp}
        </p>
        <p>
          <b>Humidity:</b> {cityInfo.humidity}
        </p>
      </div>
    </div>
  );
};

export default CitiesCard;
