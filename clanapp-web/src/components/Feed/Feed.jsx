import React, { useState, useEffect } from "react";
import "./Feed.scss";
import { Search, SearchTwoTone } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { setUserLoggedOut } from "../../actions";
import Posts from "../Posts/Posts";
import firebase from "firebase";
import db from "../../firebase";
import FlipMove from "react-flip-move";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

export default function Feed() {
  const user = useSelector((state) => state.isLogged);
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const [AllPosts, setPosts] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postChapter, setPostChapter] = useState([]);
  const [allChapters, setAllChapters] = useState([]);
  const signOut = () => {
    dispatch(setUserLoggedOut());
  };
  useEffect(() => {
    db.collection("Posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
    db.collection("Chapters")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        setAllChapters(
          snapshot.docs.map((doc) => ({ id: doc.id, chapter: doc.data() }))
        );
      });
    setPostChapter(userDetails.chapter);
  }, []);

  const Submitpost = (e) => {
    e.preventDefault();
    db.collection("Posts").doc().set({
      title: inputTitle,
      body: inputBody,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      authorName: userDetails?.name,
      authorEmail: userDetails?.email,
      likes: [],
      admin: userDetails?.admin,
      chapter: postChapter,
    });
    setInputBody("");
    setInputTitle("");
  };

  useEffect(() => {
    const tempList = AllPosts.filter((data) => {
      return (
        data.post.body.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
          -1 ||
        data.post.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
          -1 ||
        data.post.authorName
          .toLowerCase()
          .indexOf(searchQuery.toLowerCase()) !== -1
      );
    });
    const finalList = tempList.filter((data) => {
      for (let i = 0; i < data.post.chapter.length; i++) {
        for (let j = 0; j < userDetails?.chapter?.length; j++) {
          if (data.post.chapter[i] === userDetails?.chapter[j]) {
            return true;
          }
        }
      }
      return false;
    });
    setFilteredPosts(finalList);
  }, [searchQuery, AllPosts]);

  const handleChapterChange = (event, newChapters) => {
    setPostChapter(newChapters);
  };

  return (
    <div className="Feed">
      <div className="Header">
        <div className="title">CLAN SERVER</div>
        <div className="filter">
          <Search />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
          />
        </div>
        <div className="userPanel">
          <div className="details">
            <div className="avatar">
              <img src={user?.photoURL} />
              <div className="name">{user?.displayName}</div>
            </div>
          </div>
          <div className="logout">
            <div className="permission">
              {userDetails?.admin ? (
                <Link to="/panel">
                  <div className="clickable">
                    <Button className="clickable">Admin Panel</Button>
                  </div>
                </Link>
              ) : userDetails?.form ? (
                userDetails?.approved ? (
                  ""
                ) : (
                  <div className="Red">
                    <Button className="Red">Pending</Button>
                  </div>
                )
              ) : (
                <Link to="/register">
                  <div className="clickable">
                    <Button>Registration Form</Button>
                  </div>
                </Link>
              )}
            </div>
            <div className="clickable">
              <Button onClick={signOut}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="posts">
        {userDetails?.approved ? (
          <div className="addPost">
            <form>
              <div className="title">Add post</div>
              <div className="inputTitle">
                <input
                  type="text"
                  vlaue={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  placeholder="Give your post a Title..."
                />
              </div>
              <div className="inputBody">
                <textarea
                  type="text"
                  placeholder="enter text for post..."
                  vlaue={inputBody}
                  onChange={(e) => setInputBody(e.target.value)}
                  cols="50"
                />
              </div>

              {userDetails?.admin ? (
                <ToggleButtonGroup
                  value={postChapter}
                  onChange={handleChapterChange}
                >
                  {" "}
                  {allChapters?.map(({ id, chapter }) => (
                    <ToggleButton value={chapter.name}>
                      {chapter.name}
                    </ToggleButton>
                  ))}{" "}
                </ToggleButtonGroup>
              ) : (
                ""
              )}

              <div className="submitButton">
                <Button type="submit" onClick={Submitpost}>
                  Post
                </Button>
              </div>
            </form>
          </div>
        ) : (
          ""
        )}

        <div className="Hero">Recent Feed</div>
        {filteredPosts.map(({ id, post }) => (
          <FlipMove>
            <Posts
              key={id}
              title={post.title}
              authorName={post.authorName}
              body={post.body}
              likes={post.likes}
              timestamp={post.timestamp}
              id={id}
              admin={post.admin}
              chapter={post.chapter}
            />
          </FlipMove>
        ))}
      </div>
    </div>
  );
}
