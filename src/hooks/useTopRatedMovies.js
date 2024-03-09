import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../store/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies)

  const getTopRatedMovies = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", API_OPTIONS);
    const json = await data.json();
    const topRatedMovies = json.results
    dispatch(addTopRatedMovies(topRatedMovies))
  }

  useEffect(() => {
    !topRatedMovies && getTopRatedMovies();
  })

}

export default useTopRatedMovies;