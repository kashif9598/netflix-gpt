import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../store/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)

  const getNowPlayingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
    const nowPlayingMovies = await data.json();
    dispatch(addNowPlayingMovies(nowPlayingMovies.results))
  }

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies()
  }, [])
}

export default useNowPlayingMovies;