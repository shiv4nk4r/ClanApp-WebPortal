import React, { useEffect } from "react";
import "./Registration.scss";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import db from "../../firebase";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoggedOut } from "../../actions";

export default function Registration() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Address, setAddress] = useState("");

  const user = useSelector((state) => state.isLogged);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(userDetails?.email);
  }, []);

  const signOut = () => {
    dispatch(setUserLoggedOut());
  };

  const submit = (e) => {
    db.collection("UserRegistrations").doc().set({
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      contactNo: Contact,
      adress: Address,
      approved: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    db.collection("UserDetails")
      .where("email", "==", userDetails.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ form: true });
        });
      });
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
      <div className="form-wrapper">
        <form>
          <div className="form-section">
            <div>
              <label htmlFor="">Fist name</label>
              <input
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <label htmlFor="">Last Name</label>
              <input
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className="form-section">
            <div>
              <label htmlFor="">Email ID</label>
              <input
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
          </div>
          <div className="form-section">
            <div>
              <label htmlFor="">Contact No</label>
              <input
                value={Contact}
                onChange={(e) => setContact(e.target.value)}
                type="tel"
              />
            </div>
          </div>
          <div className="form-section">
            <div>
              <label htmlFor="">Address</label>
              <input
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="resize"
              />
            </div>
          </div>
          <Button type="submit" onClick={submit} className="registerButton">
            Register
          </Button>
        </form>
      </div>
    </>
  );
}
