import axios from "axios";

console.log(process.env.REACT_APP_MOVIE_DB_ACCESS_TOKEN)
export const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_MOVIE_DB_ACCESS_TOKEN}`,
      }
      
})