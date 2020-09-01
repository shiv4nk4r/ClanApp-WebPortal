import React, { useEffect, useState } from "react";
import "./ChapterItem.scss";
import { Link } from "react-router-dom";
import { SupervisedUserCircle, Assessment } from "@material-ui/icons";

function ChapterItem({ name, id, allUsers }) {
  const [members, setMember] = useState([]);

  useEffect(() => {
    console.log(allUsers);
    const tempList = allUsers?.filter((user) => {
      return user.chapter && user.chapter?.indexOf(name) != -1;
    });
    setMember(tempList);
  }, [allUsers]);

  return (
    <div className="chapterItem">
      <div className="upperSection">
        <div className="title">{name}</div>
        <div className="members">
          members <span>{members?.length}</span>
        </div>
      </div>
      <div className="lowerSection">
        <Link>
          <div className="admins">
            <SupervisedUserCircle /> View Admins
          </div>
        </Link>
        <Link>
          <div className="details">
            <Assessment />
            View Details
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ChapterItem;
