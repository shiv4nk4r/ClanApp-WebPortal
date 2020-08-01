import React from "react";
import "./tweet.scss";

function Tweet({ From, Message }) {
  return (
    <div className="Tweet">
      <div className="message">{Message}</div>
      <div className="from">{From}</div>
    </div>
  );
}

export default Tweet;
