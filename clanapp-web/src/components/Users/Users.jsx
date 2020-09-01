import React, { useState, useEffect } from "react";
import "./Users.scss";
import UserListItem from "../UsersListItem/UserListItem";
import db from "../../firebase";
import { useSelector } from "react-redux";
import { FilterList } from "@material-ui/icons";
import FlipMove from "react-flip-move";

export default function Users() {
  const [users, SetUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [searchApproved, setSearchApproved] = useState("");
  const [searchPending, setSearchPending] = useState("");
  const [renderApproved, setRenderApproved] = useState([]);
  const [renderPending, setRenderPending] = useState([]);
  const [chapterList, setChapterList] = useState([]);

  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    db.collection("UserDetails")
      .orderBy("email", "asc")
      .onSnapshot((snapshot) => {
        SetUsers(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
    db.collection("Chapters")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        setChapterList(
          snapshot.docs.map((doc) => ({ id: doc.id, chapter: doc.data() }))
        );
      });
    setChapterList(userDetails.chapter);
  }, []);

  useEffect(() => {
    setApprovedUsers([]);
    setPendingUsers([]);
    users.map((user) => {
      if (
        user.data.email !== userDetails.email &&
        user.data.email !== "shivankar1234@gmail.com"
      ) {
        if (user.data.approved === true) {
          setApprovedUsers((approvedUsers) => [...approvedUsers, user]);
        } else {
          setPendingUsers((pendingUsers) => [...pendingUsers, user]);
        }
      }
    });
  }, [users]);

  useEffect(() => {
    const tempList = approvedUsers.filter((user) => {
      return (
        user.data.email.toLowerCase().indexOf(searchApproved.toLowerCase()) !==
        -1
      );
    });
    setRenderApproved(tempList);
  }, [searchApproved, approvedUsers]);

  useEffect(() => {
    const tempList = pendingUsers.filter((user) => {
      return (
        user.data.email.toLowerCase().indexOf(searchPending.toLowerCase()) !==
        -1
      );
    });
    setRenderPending(tempList);
  }, [searchPending, pendingUsers]);

  return (
    <div class="users-main-wrapper">
      <div className="users-approved-wrapper">
        <div className="title-section">
          <div className="title">Approved Users</div>
          <div className="numUsers">Showing {renderApproved.length}</div>
          <div className="input">
            <FilterList />
            <input
              type="text"
              value={searchApproved}
              onChange={(e) => setSearchApproved(e.target.value)}
              placeholder="Filter By Email"
            />
          </div>
        </div>
        <div className="users-section">
          <FlipMove>
            {renderApproved.map(({ data }, id) => (
              <UserListItem key={id} email={data.email} user={data} />
            ))}
          </FlipMove>
        </div>
      </div>
      <div className="users-pending-wrapper">
        <div className="title-section">
          <div className="title">Approved Users</div>
          <div className="numUsers">Showing {renderPending.length}</div>
          <div className="input">
            <FilterList />
            <input
              type="text"
              value={searchPending}
              onChange={(e) => setSearchPending(e.target.value)}
              placeholder="Filter By Email"
            />
          </div>
        </div>
        <div className="users-section">
          <FlipMove>
            {renderPending.map(({ data, id }) => (
              <UserListItem
                key={id}
                email={data.email}
                user={data}
                chapterList={chapterList}
              />
            ))}
          </FlipMove>
        </div>
      </div>
    </div>
  );
}
