import React, { useState, useEffect } from "react";
import requests from "../requests";
import axios from "../axios";
import "../css/Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      await setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("//image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner__btns">
            <button className="banner__btn">Play</button>
            <button className="banner__btn">My List</button>
          </div>
          <div className="banner__descriptionBox">
            <h2 className="banner__description">
              {truncate(movie?.overview, 200)}
            </h2>
          </div>
        </div>
        <div className="banner__fadeBottom"></div>
      </header>
    </>
  );
}

export default Banner;
