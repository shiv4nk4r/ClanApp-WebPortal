import React from "react";
import "./Login.scss";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserSignedIn, setUserDetails } from "../../actions";
import db from "../../firebase";
import firebase from "firebase";

export default function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch(setUserSignedIn(result.user));
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <h1>Sign in to Clan App Admin Panel</h1>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}
