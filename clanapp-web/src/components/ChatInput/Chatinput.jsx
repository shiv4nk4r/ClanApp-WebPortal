import React, { useState } from "react";
import "./chatinput.scss";
import { Button } from "@material-ui/core";
import db from "../../firebase";
import { useSelector } from "react-redux";
import firebase from "firebase";

export default function Chatinput({ channelName, channelid }) {
  const [input, setInput] = useState("");
  const user = useSelector((state) => state.isLogged);

  const sendMessage = (e) => {
    e.preventDefault();
    if (channelid) {
      db.collection("channel").doc(channelid).collection("message").doc().set({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
      setInput("");
    }
  };
  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message to #${channelName}`}
        />
        <Button type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </div>
  );
}
