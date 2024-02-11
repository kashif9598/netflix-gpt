import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../store/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    const upcomingMovies = json.results
    dispatch(addUpcomingMovies(upcomingMovies))
  }

  useEffect(() => {
    getUpcomingMovies();
  })

}

export default useUpcomingMovies;