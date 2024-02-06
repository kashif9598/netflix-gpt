import React, { useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { BG_IMG } from "../utils/constants";

const Login = () => {
  // if isSignedIn is false, render sign up Form
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
    setEmail("");
    setPassword("");
    setName("");
    setErrMessage(null);
  };

  const handleButtonClick = () => {
    const message = isSignedIn
      ? checkValidData(email, password)
      : checkValidData(email, password, name);
    setErrMessage(message);
    if (message) return;

    if (!isSignedIn) {
      //sign up logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              // An error occurred
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute"
          src={BG_IMG}
          alt="background"
        />
      </div>
      <form
        onClick={(e) => e.preventDefault()}
        className="absolute bg-black text-white mx-auto w-4/12 right-0 left-0 my-36 bg-opacity-80 p-12"
      >
        <h1 className="text-3xl pb-6">{isSignedIn ? "Sign In" : "Sign Up"}</h1>
        {!isSignedIn && (
          <input
            value={name}
            className="bg-[#333] p-3 my-3 w-full rounded-md"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          value={email}
          className="bg-[#333] p-3 my-3 w-full rounded-md"
          type="text"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          className="bg-[#333] p-3 my-3 w-full rounded-md"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-700">{errMessage}</p>
        <button
          className="bg-red-600 w-full rounded-md p-3 my-3 font-bold"
          onClick={handleButtonClick}
        >
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer mt-3" onClick={toggleSignIn}>
          {isSignedIn
            ? "New to Netflix? Sign Up now"
            : "Already registered? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
