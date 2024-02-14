import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import { useTranslation } from "react-i18next";

const SecondaryContainer = () => {
  const { t } = useTranslation();
  const movies = useSelector((store) => store.movies);
  return (
    <div className="bg-black ">
      <div className="-mt-52 relative z-20">
        <MovieList title={t("now_playing")} movies={movies?.nowPlayingMovies} />
        <MovieList title={t("Top_Rated")} movies={movies?.topRatedMovies} />
        <MovieList title={t("Popular")} movies={movies?.popularMovies} />
        <MovieList title={t("Upcoming")} movies={movies?.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
