import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../store/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies)

  const getUpcomingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    const upcomingMovies = json.results
    dispatch(addUpcomingMovies(upcomingMovies))
  }

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  })

}

export default useUpcomingMovies;