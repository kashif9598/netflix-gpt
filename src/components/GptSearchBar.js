import { useRef } from "react";
import { useTranslation } from "react-i18next";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../store/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    // Make an API call to GPT API

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Koi Mil Gaya, Ek tha tiger, Jab we met, Kuch Kuch Hota hai, Golmaal";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    // if (!gptResults.choices) {
    //   TODO : Write error handling
    // }

    console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    // for each movie search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
  };

  return (
    <div className="pt-[20%] flex justify-center">
      <form
        className="w-4/5 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={t("What_do_you_wanna_watch_today")}
          className="col-span-9 p-4 m-4"
        />
        <button
          className="col-span-3 text-white rounded-lg bg-red-600 px-4 m-4"
          onClick={handleGptSearchClick}
        >
          {t("Search")}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
