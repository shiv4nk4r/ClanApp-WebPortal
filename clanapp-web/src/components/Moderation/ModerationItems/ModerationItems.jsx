import React, { forwardRef } from "react";
import "./ModerationItems.scss";

const ModerationItems = forwardRef(({ by, value, user, purpose }, ref) => {
  return (
    <div ref={ref} className="moderationItem">
      <div className="by">
        By <span>{by}</span>
      </div>
      <div className="Purpose">
        Purpose <span>{purpose}</span>
      </div>
      <div className="user">
        User <span>{user}</span>
      </div>
      <div className="value">
        Value{" "}
        <span>
          {value ? (
            <div className="Green">Active</div>
          ) : (
            <div className="Red">Not Active</div>
          )}
        </span>
      </div>
    </div>
  );
});

export default ModerationItems;
