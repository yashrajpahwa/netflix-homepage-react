import axios from "axios";

const instance = axios.create({
  baseURL: "//api.themoviedb.org/3",
});

export default instance;
