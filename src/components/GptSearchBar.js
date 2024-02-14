import { useTranslation } from "react-i18next";

const GptSearchBar = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center absolute top-[40%] left-[26%] w-[50%]">
      <form className="bg-black grid grid-cols-12 w-full">
        <input
          type="text"
          placeholder={t("What_do_you_wanna_watch_today")}
          className="col-span-9 p-4 m-4"
        />
        <button className="col-span-3 text-white rounded-lg bg-red-600 px-4 m-4">
          {t("Search")}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
