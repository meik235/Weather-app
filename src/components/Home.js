import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import Header from "./Header";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [favoriteCity, setFavoriteCity] = useState([]);

  useEffect(() => {
    onload();
  }, []);

  const onload = async () => {
    const result = await axios.get("http://localhost:3003/cities-data");
    const list = [];
    result.data.filter((favcity) =>
      favcity.isFavorite ? list.push(favcity) : ""
    );
    setFavoriteCity(list);
  };

  const removeFavorite = async (id) => {
    await axios.patch(`http://localhost:3003/cities-data/${id}`, {
      isFavorite: false,
    });
    onload();
  };

  return (
    <div className="home">
      <Header />
      <div className="home__container">
        {favoriteCity.length !== 0 ? (
          favoriteCity.map((city) => (
            <div
              className="favorite__city__container"
              key={city.id}
              style={{
                visibility: city.isFavorite ? "visible" : "hidden",
                display: city.isFavorite ? "" : "none",
              }}
            >
              <div className="favorite__city__header">
                <>
                  {city.name}
                  <StarIcon onClick={() => removeFavorite(city.id)} />
                </>
              </div>
              <div className="favorite__city">
                <h4>{city.desc}</h4>
                <p>
                  <b>Temperature:</b> {city.temp}
                </p>
                <p>
                  <b>Humidity:</b> {city.humidity}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>You have not selected any city as a favorite yet.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
