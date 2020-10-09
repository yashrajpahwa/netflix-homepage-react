import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../css/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

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

  const trailerPlayerOptions = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (m) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(m?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const [trailerUrl, setTrailerUrl] = useState("");
  return (
    <div>
      <>
        <div className="row">
          <h2 className="row__heading">{title}</h2>
          <div className="row__posters">
            {movies.map((m) => (
              <img
                onClick={() => handleClick(m)}
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
        {trailerUrl && (
          <YouTube videoId={trailerUrl} opts={trailerPlayerOptions} />
        )}
      </>
    </div>
  );
}

export default Row;
