import React from "react";
import "./FeedHeader.scss";
import { Link } from "react-router-dom";

function FeedHeader() {
  return (
    <div className="Header">
      <div className="title">CLAN SERVER</div>
      <div className="filter">
        <Search />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
        />
      </div>
      <div className="userPanel">
        <div className="details">
          <div className="avatar">
            <img src={user?.photoURL} />
            <div className="name">{user?.displayName}</div>
          </div>
        </div>
        <div className="logout">
          <div className="permission">
            {userDetails?.admin ? (
              <Link to="/panel">
                <div className="clickable">
                  <Button className="clickable">Admin Panel</Button>
                </div>
              </Link>
            ) : userDetails?.form ? (
              userDetails?.approved ? (
                ""
              ) : (
                <div className="Red">
                  <Button className="Red">Pending</Button>
                </div>
              )
            ) : (
              <Link to="/register">
                <div className="clickable">
                  <Button>Registration Form</Button>
                </div>
              </Link>
            )}
          </div>
          <div className="clickable">
            <Button onClick={signOut}>Logout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedHeader;
