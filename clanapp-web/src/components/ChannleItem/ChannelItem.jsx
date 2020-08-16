import React from "react";
import "./ChannelItem.scss";
import { Link, useHistory } from "react-router-dom";
import db from "../../firebase";
import { Add } from "@material-ui/icons";

export default function ChannelItem({ id, channelName }) {
  const history = useHistory();

  const selectChannel = () => {
    if (id) {
      history.push(`/channel/${id}`);
    } else {
      history.push(channelName);
    }
  };

  const addChannel = () => {
    const nameOfChannel = prompt("Please Enter the new Channel name");
    if (nameOfChannel) {
      db.collection("channel").add({ name: nameOfChannel });
    }
  };

  return (
    <div className="ChannelItem">
      {channelName == "Add Channel" ? (
        <Add onClick={addChannel} />
      ) : (
        <strong>#</strong>
      )}
      {channelName}
    </div>
  );
}
