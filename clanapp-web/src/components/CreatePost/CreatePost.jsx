import React, { useState, useEffect } from "react";
import "./CreatePost.scss";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import db from "../../firebase";
import { useSelector } from "react-redux";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

function CreatePost() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  const userDetails = useSelector((state) => state.userDetails);
  const [postChapter, setPostChapter] = useState([]);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    db.collection("Chapters")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) =>
          setChapters((chapterList) => [
            ...chapterList,
            { id: doc.id, chapter: doc.data() },
          ])
        );
      });
    setPostChapter(userDetails.chapter);
  }, []);
  const post = (e) => {
    const tempTitle = inputTitle;
    const tempBody = inputBody;
    setInputBody("");
    setInputTitle("");

    db.collection("Posts").doc().set({
      title: tempTitle,
      body: tempBody,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      authorName: userDetails?.name,
      authorEmail: userDetails?.email,
      likes: [],
      chapter: postChapter,
      admin: true,
    });
    alert("Post Added Successfully");
  };

  const handleChapterChange = (event, newChapters) => {
    setPostChapter(newChapters);
  };

  return (
    <div className="CreatePost">
      <form>
        <div className="addTitle">
          <label>Title</label>
          <input
            type="text"
            placeholder="Add Title..."
            vlaue={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
        </div>
        <ToggleButtonGroup value={postChapter} onChange={handleChapterChange}>
          {chapters?.map(({ chapter }) => (
            <ToggleButton value={chapter.name}>{chapter.name}</ToggleButton>
          ))}
        </ToggleButtonGroup>
        <div className="addBody">
          <label>Body</label>
          <textArea
            placeholder="Add Text..."
            rows="10"
            cols="50"
            vlaue={inputBody}
            onChange={(e) => setInputBody(e.target.value)}
          ></textArea>
        </div>
        <div className="postButton">
          <Button type="submit" onClick={post}>
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
