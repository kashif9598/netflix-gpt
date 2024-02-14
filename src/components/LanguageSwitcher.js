import { useDispatch } from "react-redux"
import { updateLanguage } from "../store/configSlice";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const LanguageSwitcher = () => {
    const dispatch = useDispatch();
    const { i18n } = useTranslation();

    const SUPPORTED_LANG = [
        {code: "en", lang: "English"},
        {code: "fr", lang: "French"},
        {code: "hi", lang: "Hindi"},
        {code: "ar", lang: "Arabic"},
    ]

    useEffect(() => {
        document.body.dir = i18n.dir()
    },[i18n, i18n.language])

    const handleChangeLanguage = (e) => {
        console.log(e.target.value)
        dispatch(updateLanguage(e.target.value));
        i18n.changeLanguage(e.target.value)
    }

  return (
    <div>
        <select onChange={handleChangeLanguage}>
            {SUPPORTED_LANG.map(lang => <option key={lang.code} value={lang.code}>{lang.lang}</option>)}
        </select>
    </div>
  )
}

export default LanguageSwitcher