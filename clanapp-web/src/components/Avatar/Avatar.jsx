import React from "react";
import "./Avatar.scss";
import { useDispatch } from "react-redux";
import { setUserLoggedOut } from "../../actions";

export default function Avatar({ alt, src }) {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(setUserLoggedOut());
  };

  return (
    <div className="Avatar">
      <img src={src} />{" "}
      <div>
        {alt} <span onClick={signOut}>logout</span>
      </div>
    </div>
  );
}
