import React, { forwardRef } from "react";
import "./Message.scss";

const Message = forwardRef(({ message, timestamp, user, userImage }, ref) => {
  return (
    <div ref={ref} className="message">
      <img src={userImage} alt="" />
      <div className="messageInformation">
        <h4>
          {user}{" "}
          <span className="massageTimestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
});
export default Message;
