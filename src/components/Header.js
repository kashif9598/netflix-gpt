import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { APP_LOGO, USER_IMG } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
        // User is signed out
        // ...
      }
    });

    //Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-screen px-2 py-2 bg-gradient-to-b from-black z-30 justify-between flex">
      <img
        className="w-[235px]"
        src={APP_LOGO}
        alt="logo"
      />

      <div className="flex p-4 m-4 items-center">
        <img
          alt="user-icon"
          src={USER_IMG}
        />
        <button onClick={handleSignOut}>(Sign Out)</button>
      </div>
    </div>
  );
};

export default Header;
