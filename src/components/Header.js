import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { APP_LOGO, USER_IMG } from "../utils/constants";
import { toggleGptSearchView } from "../store/gptSlice";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
        // User is signed out
      }
    });

    //Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  return (
    <div className="absolute w-full px-2 py-2 bg-gradient-to-b from-black z-30 justify-between flex">
      <img className="w-[235px]" src={APP_LOGO} alt="logo" />

      {user && (
        <div className="flex p-4 m-4 items-center">
          <LanguageSwitcher />
          <button
            className="bg-purple-800 rounded-lg py-2 my-2 px-4 mx-4 text-white"
            onClick={handleGptSearchClick}
          >
            {!showGptSearch ? t("GPT_Search") : "Home"}
          </button>
          <img alt="user-icon" src={USER_IMG} />
          <button onClick={handleSignOut} className="text-white">
            {t("Sign_Out")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
