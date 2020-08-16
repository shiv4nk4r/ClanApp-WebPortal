import React, { Button, useEffect, useState } from "react";
import "./SideBar.scss";
import MenuItem from "../MenuItem/MenuItem";
import ChannelItem from "../ChannleItem/ChannelItem";
import {
  KeyboardArrowDown,
  Home,
  AccountCircle,
  ArrowRightAlt,
  Notifications,
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
        <MenuItem Icon={Home} title="Home" />
        <MenuItem Icon={AccountCircle} title="Users" />
        <MenuItem Icon={Notifications} title="Moderation" />
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