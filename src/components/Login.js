import React, { useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);

  const toggleSignIn = () => {
    setIsSignedIn(!isSignedIn);
    setEmail("");
    setPassword("");
    setName("");
    setErrMessage(null)
  };

  const handleButtonClick = () => {
    const message = isSignedIn
      ? checkValidData(email, password)
      : checkValidData(
          email,
          password,
          name
        );
    setErrMessage(message);
  };
  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/893a42ad-6a39-43c2-bbc1-a951ec64ed6d/1d86e0ac-428c-4dfa-9810-5251dbf446f8/IN-en-20231002-popsignuptwoweeks-perspective_alpha_website_large.jpg"
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
            onChange={(e) =>setName(e.target.value) }
          />
        )}
        <input
          value={email}
          className="bg-[#333] p-3 my-3 w-full rounded-md"
          type="text"
          placeholder="Email address"
          onChange={(e) =>setEmail(e.target.value) }
        />
        <input
          value={password}
          className="bg-[#333] p-3 my-3 w-full rounded-md"
          type="password"
          placeholder="Password"
          onChange={(e) =>setPassword(e.target.value) }
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
