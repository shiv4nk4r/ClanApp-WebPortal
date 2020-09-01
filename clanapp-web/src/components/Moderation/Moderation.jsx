import React, { useState, useEffect } from "react";
import "./Moderation.scss";
import db from "../../firebase";
import { FilterList } from "@material-ui/icons";
import ModerationItems from "./ModerationItems/ModerationItems";

import FlipMove from "react-flip-move";

export default function Moderation() {
  const [moderationData, setModerationData] = useState([]);
  const [inputBy, SetInputBy] = useState("");
  const [inputUser, setInputUser] = useState("");
  const [inputAction, setInputAction] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    db.collection("Moderation")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setModerationData(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    const tempList = moderationData.filter((data) => {
      return (
        data.data.by.toLowerCase().indexOf(inputBy.toLowerCase()) !== -1 &&
        data.data.effectedUser
          .toLowerCase()
          .indexOf(inputUser.toLowerCase()) !== -1 &&
        data.data.purpose.toLowerCase().indexOf(inputAction.toLowerCase()) !==
          -1
      );
    });
    setFilteredData(tempList);
  }, [inputBy, inputAction, inputUser, moderationData]);

  return (
    <div className="moderation">
      <div className="titleSection">
        <div className="title">Moderation Tab</div>
        <div className="Number">
          Showing {filteredData.length} docs, latest on top
        </div>
        <div className="filter">
          <FilterList />
          <input
            type="text"
            placeholder="By"
            value={inputBy}
            onChange={(e) => SetInputBy(e.target.value)}
          />
          <input
            type="text"
            placeholder="Purpose"
            value={inputAction}
            onChange={(e) => setInputAction(e.target.value)}
          />
          <input
            type="text"
            placeholder="User"
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
          />
        </div>
      </div>
      <div className="logs">
        <FlipMove>
          {filteredData.map(({ data, id }) => (
            <ModerationItems
              key={id}
              by={data.by}
              value={data.value}
              user={data.effectedUser}
              purpose={data.purpose}
            />
          ))}
        </FlipMove>
      </div>
    </div>
  );
}
