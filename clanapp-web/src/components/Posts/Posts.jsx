import React, { forwardRef, useEffect, useState } from "react";
import "./Posts.scss";
import { ThumbUpAlt, VerifiedUser } from "@material-ui/icons";
import db from "../../firebase";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";

const Posts = forwardRef(
  ({ title, authorName, timestamp, body, likes, id, admin, chapter }, ref) => {
    const [liked, setLiked] = useState();
    const userDetails = useSelector((state) => state.userDetails);

    useEffect(() => {
      if (likes.includes(userDetails?.email)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }, [likes, id]);

    const toggleLike = () => {
      if (liked == true) {
        const tempLikeList = likes;
        const index = tempLikeList.indexOf(userDetails.email);
        if (index > -1) {
          tempLikeList.splice(index, 1);
        }
        db.collection("Posts").doc(id).update({
          likes: tempLikeList,
        });
      } else {
        const tempLikeList = likes.concat(userDetails.email);
        db.collection("Posts").doc(id).update({
          likes: tempLikeList,
        });
      }
    };

    return (
      <div ref={ref} className="Post">
        <div className="postHeader">
          <div className="leftSection">
            <div className="postTitle">{title}</div>
            <div className="postBy">
              {authorName} {admin ? <VerifiedUser /> : ""}{" "}
            </div>
          </div>
          <div className="rightSection">
            <div className="postDate">
              {new Date(timestamp?.toDate()).toUTCString()}
            </div>
            <div className="chapters">
              {chapter?.map((name) => (
                <Button>{name}</Button>
              ))}
            </div>
          </div>
        </div>
        <div className="postBody">{body}</div>
        <div className="postFooter">
          {liked ? (
            <div className="Approved" onClick={toggleLike}>
              <ThumbUpAlt />
            </div>
          ) : (
            <div className="NotApproved" onClick={toggleLike}>
              <ThumbUpAlt />
            </div>
          )}
          <div className="likes">{likes?.length} Likes</div>
        </div>
      </div>
    );
  }
);

export default Posts;
