import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../store/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", API_OPTIONS);
    const json = await data.json();
    const popularMovies = json.results
    dispatch(addPopularMovies(popularMovies))
  }

  useEffect(() => {
    getPopularMovies();
  })

}

export default usePopularMovies;