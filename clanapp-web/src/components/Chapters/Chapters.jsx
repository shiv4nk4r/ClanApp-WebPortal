import React, { useEffect, useState } from "react";
import "./Chapters.scss";
import ChapterItem from "../ChapterItem/ChapterItem";
import db from "../../firebase";
import { Button } from "@material-ui/core";
import firebase from "firebase";

function Chapters() {
  const [Chapters, setChapters] = useState([]);
  const [inputChapterName, setInputChapterName] = useState("");
  const [contains, setContains] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const Check = Chapters.filter((data) => {
      return data.chapter.name.toLowerCase() == inputChapterName.toLowerCase();
    });
    if (Check.length > 0) {
      setContains(true);
    } else {
      setContains(false);
    }
  }, [inputChapterName]);

  const addChapter = (e) => {
    e.preventDefault();
    if (contains == false) {
      db.collection("Chapters").doc().set({
        name: inputChapterName,
        members: [],
        admins: [],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  useEffect(() => {
    db.collection("UserDetails")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setAllUsers(snapshot.docs.map((doc) => doc.data()));
      });
    db.collection("Chapters")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        setChapters(
          snapshot.docs.map((doc) => ({ id: doc.id, chapter: doc.data() }))
        );
      });
  }, []);

  return (
    <div className="chapterSection">
      <div className="addChapter">
        <form>
          <label>Add Chapter</label>
          <input
            className={contains == true ? "Red" : ""}
            type="text"
            placeholder="Add chapter name..."
            vlaue={inputChapterName}
            required
            onChange={(e) => setInputChapterName(e.target.value)}
          />
          <Button type="Submit" onClick={addChapter}>
            Add
          </Button>
        </form>
      </div>
      {Chapters.map(({ id, chapter }) => (
        <ChapterItem key={id} name={chapter.name} allUsers={allUsers} />
      ))}
    </div>
  );
}

export default Chapters;
