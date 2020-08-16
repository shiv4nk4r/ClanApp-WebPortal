import React from "react";
import "./Registration.scss";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoggedOut } from "../../actions";

export default function Awaiting() {
  const user = useSelector((state) => state.isLogged);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(setUserLoggedOut());
  };
  return (
    <>
      <div className="form-header">
        Udyaan Care Registeration Form{" "}
        <div>
          Signed In as <strong>{user?.displayName}</strong>
          <Button onClick={signOut}>Logout</Button>
        </div>
      </div>
      <div className="Approval">
        Status
        {userDetails.approved ? (
          <strong className="Green">Approved</strong>
        ) : (
          <strong className="Red">Not Approved</strong>
        )}
      </div>
    </>
  );
}
