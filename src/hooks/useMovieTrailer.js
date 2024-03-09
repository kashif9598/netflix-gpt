import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../store/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getTrailerData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const videoData = await data.json();
    const filteredData = videoData.results.filter(
      (video) => video.name === "Official Trailer" || video.type === "Trailer"
    );
    const trailer = filteredData.length
      ? filteredData[0]
      : videoData.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    !trailerVideo && getTrailerData();
  }, []);
};

export default useMovieTrailer;
