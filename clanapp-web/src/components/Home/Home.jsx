import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Tweet from "../Tweets/Tweet";
import db from "../../firebase";
import firebase from "firebase";

function Home() {
  const [fromInput, setFrom] = useState("");
  const [messageInput, setMessage] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("TimeStamp", "asc")
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        setTweets(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const [tweets, setTweets] = useState([]);

  const sendTweet = (event) => {
    event.preventDefault();
    let data = { From: fromInput, Message: messageInput };
    db.collection("messages").add({
      From: fromInput,
      Message: messageInput,
      TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFrom("");
    setMessage("");
  };

  return (
    <>
      <Header />
      <form>
        <input
          type="text"
          placeholder="From"
          value={fromInput}
          onChange={(event) => setFrom(event.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={messageInput}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit" onClick={sendTweet}>
          Submit
        </button>
      </form>
      {tweets.map((tweet) => (
        <Tweet From={tweet.From} Message={tweet.Message} />
      ))}
    </>
  );
}

export default Home;
