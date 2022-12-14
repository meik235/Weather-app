import React, { useState, useEffect } from "react";
import StarIcon from "@material-ui/icons/Star";
import axios from "axios";
import "./CitiesCard.css";

const CitiesCard = ({ id }) => {
  const [cityInfo, setCityInfo] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    onload();
  }, [id]);

  const onload = () => {
    axios
      .get(`http://localhost:3003/cities-data/${id}`)
      .then((response) => {
        setCityInfo(response.data);
      })
      .catch((error) => console.log(error));
  };

  const addFavoriteHandler = async (city) => {
    isFavorite ? setIsFavorite(true) : setIsFavorite(false);
    await favoriteHandler(city);
  };

  const favoriteHandler = async (data) => {
    !isFavorite
      ? await axios.patch(`http://localhost:3003/cities-data/${data.id}`, {
          isFavorite: true,
        })
      : await axios.patch(`http://localhost:3003/cities-data/${data.id}`, {
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
