import React, { useEffect } from "react";
import "./app.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from "./components/sideBar/SideBar";
import Channel from "./components/Channels/Channel";
import Login from "./components/Login/Login";
import { useSelector, useDispatch } from "react-redux";
import Registration from "./components/Registration/Registration";
import db from "./firebase";
import firebase from "firebase";
import { setUserDetails } from "./actions";
import Users from "./components/Users/Users";
import Moderation from "./components/Moderation/Moderation";
import Feed from "./components/Feed/Feed";
import CreatePost from "./components/CreatePost/CreatePost";
import Chapters from "./components/Chapters/Chapters";

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
        if (result.docs[0] != null) {
          dispatch(setUserDetails(result.docs[0].data()));
        } else {
          createUserDetails();
        }
      });
  };

  const createUserDetails = () => {
    db.collection("UserDetails").doc().set({
      name: user.displayName,
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
        ) : (
          <>
            <Switch>
              <Route path="/" exact>
                <Feed />
              </Route>

              <Route path="/register" exact>
                <Registration />
              </Route>
              <Route path="/panel">
                {userDetails?.admin ? (
                  <>
                    <div className="main">
                      <SideBar />
                      <div className="feed">
                        <Switch>
                          <Route path="/panel/" exact>
                            <Users />
                          </Route>
                          <Route path="/panel/channel/:channelID">
                            <Channel />
                          </Route>
                          <Route path="/panel/users">
                            <Users />
                          </Route>
                          <Route path="/panel/moderation">
                            <Moderation />
                          </Route>
                          <Route path="/panel/createpost">
                            <CreatePost />
                          </Route>
                          <Route path="/panel/chapters" exact>
                            <Chapters />
                          </Route>
                        </Switch>
                      </div>
                    </div>
                  </>
                ) : (
                  <Feed />
                )}
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
