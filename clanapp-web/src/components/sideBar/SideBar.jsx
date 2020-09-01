import React, { Button, useEffect, useState } from "react";
import "./SideBar.scss";
import MenuItem from "../MenuItem/MenuItem";
import ChannelItem from "../ChannleItem/ChannelItem";
import {
  KeyboardArrowDown,
  Home,
  AccountCircle,
  PostAdd,
  Notifications,
  LibraryBooks,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import db from "../../firebase";
import { useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";

export default function SideBar() {
  const user = useSelector((state) => state.isLogged);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    //Run this code when SideBar componenet loads
    db.collection("channel").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
  }, []);

  return (
    <div className="SideBar">
      <div className="title">CLAN SERVER</div>
      <div className="menu">
        <Avatar alt={user?.displayName} src={user?.photoURL} />
        <MenuItem Icon={Home} link="/" title="Home" />
        <MenuItem Icon={AccountCircle} link="users" title="Users" />
        <MenuItem Icon={PostAdd} link="createpost" title="Create Post" />
        <MenuItem Icon={LibraryBooks} link="chapters" title="Chapters" />
        <MenuItem Icon={Notifications} link="moderation" title="Moderation" />
      </div>
      <div className="channels">
        <div className="title">
          <KeyboardArrowDown /> Channels
        </div>
        <ChannelItem channelName="Add Channel" />
        {channels.map((channel) => (
          <Link to={`/panel/channel/${channel.id}`}>
            <ChannelItem channelName={channel.name} />
          </Link>
        ))}
      </div>
    </div>
  );
}
