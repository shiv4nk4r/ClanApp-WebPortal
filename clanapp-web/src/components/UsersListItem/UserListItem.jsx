import React, { useState, useEffect, forwardRef } from "react";
import "./UserListItem.scss";
import { AccountCircle } from "@material-ui/icons";
import { Switch } from "@material-ui/core";
import db from "../../firebase";
import { useSelector } from "react-redux";
import firebase from "firebase";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";

const UserListItem = forwardRef(({ email, user, chapterList }, ref) => {
  const [approvedState, setApproved] = useState(false);
  const [adminState, setAdmin] = useState(false);
  const [formState, SetForm] = useState(false);
  const Mainuser = useSelector((state) => state.isLogged);
  const [listChapter, setListChapter] = useState([]);
  const [userChapter, setUserChapter] = useState([]);

  useEffect(() => {
    setApproved(user.approved);
    setAdmin(user.admin);
    SetForm(user.form);
    setListChapter(chapterList);
    setUserChapter(user.chapter);
  }, [user, chapterList]);

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

  const handleChapterChange = (event, newUserChapter) => {
    setUserChapter(newUserChapter);
    db.collection("UserDetails")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ chapter: newUserChapter });
        });
      });
  };

  return (
    <div ref={ref} className="userItem">
      <div className="userEmail">
        <AccountCircle /> {email}
      </div>
      {formState ? (
        <>
          <div className="status">
            <ToggleButtonGroup
              value={userChapter}
              onChange={handleChapterChange}
            >
              {listChapter?.map(({ id, chapter }) => (
                <ToggleButton value={chapter?.name}>
                  {chapter?.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <div className="status">
            Approved{" "}
            <Switch
              className="Switch"
              onChange={changeApprove}
              checked={approvedState}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </>
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
