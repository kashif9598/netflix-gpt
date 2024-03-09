import { BG_IMG } from "../utils/constants"
import GptMovieSuggestions from "./GptMovieSuggestions"
import GptSearchBar from "./GptSearchBar"

const GptSearchPage = () => {
  return (
    <div>
      <div>
        <img
          className="fixed -z-10"
          src={BG_IMG}
          alt="background"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  )
}

export default GptSearchPage