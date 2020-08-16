import React, { useState, useEffect, forwardRef } from "react";
import "./UserListItem.scss";
import { AccountCircle, Mail, ContactPhone } from "@material-ui/icons";
import { Switch } from "@material-ui/core";
import db from "../../firebase";
import { useSelector } from "react-redux";
import firebase from "firebase";

const UserListItem = forwardRef(({ email, user }, ref) => {
  const [approvedState, setApproved] = useState(false);
  const [adminState, setAdmin] = useState(false);
  const [formState, SetForm] = useState(false);
  const Mainuser = useSelector((state) => state.isLogged);

  useEffect(() => {
    setApproved(user.approved);
    setAdmin(user.admin);
    SetForm(user.form);
  }, [user]);

  const changeApprove = () => {
    db.collection("UserDetails")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ approved: !approvedState });
        });
      });
    db.collection("Moderation").doc().set({
      by: Mainuser.email,
      purpose: "Approved",
      effectedUser: email,
      value: !approvedState,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const changeAdmin = () => {
    db.collection("UserDetails")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ admin: !adminState });
        });
      });
    db.collection("Moderation").doc().set({
      by: Mainuser.email,
      purpose: "Admin",
      effectedUser: email,
      value: !adminState,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <div ref={ref} className="userItem">
      <div className="userEmail">
        <AccountCircle /> {email}
      </div>
      {formState ? (
        <div className="status">
          Approved{" "}
          <Switch
            className="Switch"
            onChange={changeApprove}
            checked={approvedState}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      ) : (
        <div className="status">
          {" "}
          <strong class="Red">Form Pending</strong>{" "}
        </div>
      )}
      {approvedState ? (
        <div className="status">
          Admin{" "}
          <Switch
            className="Switch"
            onChange={changeAdmin}
            checked={adminState}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
});
export default UserListItem;
