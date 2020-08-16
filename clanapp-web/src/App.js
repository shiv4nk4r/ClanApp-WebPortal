import React, { useEffect } from "react";
import "./app.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SideBar from "./components/sideBar/SideBar";
import Channel from "./components/Channels/Channel";
import Login from "./components/Login/Login";
import { useSelector, useDispatch } from "react-redux";
import Registration from "./components/Registration/Registration";
import Awaiting from "./components/Registration/Awaiting";
import db from "./firebase";
import firebase from "firebase";
import { setUserDetails } from "./actions";
import Users from "./components/Users/Users";
import Moderation from "./components/Moderation/Moderation";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.isLogged);
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (user) {
      FindUser();
    }
  }, [user]);

  const FindUser = () => {
    db.collection("UserDetails")
      .where("email", "==", user.email)
      .get()
      .then((result) => {
        console.log(result);
        if (result.docs[0] != null) {
          dispatch(setUserDetails(result.docs[0].data()));
        } else {
          createUserDetails();
        }
      });
  };

  const createUserDetails = () => {
    db.collection("UserDetails").doc().set({
      email: user.email,
      approved: false,
      admin: false,
      form: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    db.collection("UserDetails")
      .where("email", "==", user.email)
      .get()
      .then((result) => {
        console.log(result);
        dispatch(setUserDetails(result.docs[0].data()));
      });
  };

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : userDetails?.admin ? (
          <>
            <div className="main">
              <SideBar />
              <div className="feed">
                <Switch>
                  <Route path="/panel/channel/:channelID">
                    <Channel />
                  </Route>
                  <Route path="/panel/users">
                    <Users />
                  </Route>
                  <Route path="/panel/moderation">
                    <Moderation />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        ) : userDetails?.form ? (
          <Awaiting />
        ) : (
          <Registration />
        )}
      </Router>
    </div>
  );
}

export default App;
