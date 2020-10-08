import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css/Row.css";

const img_baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      await setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  return (
    <div>
      <>
        <div className="row">
          <h2 className="row__heading">{title}</h2>
          <div className="row__posters">
            {movies.map((m) => (
              <img
                key={m.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${img_baseURL}${
                  isLargeRow ? m.poster_path : m.backdrop_path
                }`}
                alt={m.name}
              />
            ))}
          </div>
        </div>
      </>
    </div>
  );
}

export default Row;
