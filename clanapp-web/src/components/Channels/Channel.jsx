import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Channel.scss";
import db from "../../firebase";
import Message from "../Message/Message";
import ChatInput from "../ChatInput/Chatinput";
import FlipMove from "react-flip-move";

function Channel() {
  const { channelID } = useParams();
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);

  useEffect(() => {
    if (channelID) {
      db.collection("channel")
        .doc(channelID)
        .onSnapshot((snapshot) => setChannelDetails(snapshot.data()));
    }

    db.collection("channel")
      .doc(channelID)
      .collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChannelMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        )
      );
  }, [channelID]);

  return (
    <div className="Channel">
      <div className="channelHeader">
        <div className="channelName">
          # <strong>{channelDetails?.name}</strong>
        </div>
      </div>
      <div className="chatMessages" id="chat_message">
        <FlipMove>
          {channelMessages.map(({ id, message }) => (
            <Message
              key={id}
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
              userImage={message.userImage}
            />
          ))}
        </FlipMove>
      </div>
      <ChatInput channelName={channelDetails?.name} channelid={channelID} />
    </div>
  );
}

export default Channel;
