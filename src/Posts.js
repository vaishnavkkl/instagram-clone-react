import React, { useState, useEffect } from "react";
import "./Posts.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function Posts({ postId, username, user, imageUrl, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [color, changeColor]  = useState(false);
  const [like, setLike] = useState(0);
function handleColor(){
	if(!color){
		changeColor(true);
	}else{
		changeColor(false);
	}
}
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe =
      db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);
  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return(

	<div className="post">
		<div className="post-header">
		<Avatar 
		className="post-avatar" alt={username} src="/static/" />
		<h3>{username}</h3>
		
		</div>
		{/*header=>avatar +username*/}


		<img className="post-image" src={imageUrl} alt="" />{/*image*/}

		<div onClick={handleColor} className="like-button">
		<FavoriteBorderIcon style={{"color":color?"red":"black" }} fontSize="large" />
		
		</div>
		<h4 className="post-text"><strong>@{username}</strong> : {caption}</h4>{/*username + caption*/}
		
		<div className="post-comments">
		

		{comments.map((comment)=> (
			<p><strong>{comment.username}</strong>@ {(comment.comment)}
			 </p>
			
		))}

		</div>

		
		<form className="post-comment-form">

		<input className="post-comment" type="text" 
		placeholder="Add comment .." 
		value={comment}
		onChange={(e)=> setComment(e.target.value)} />
		
		<button className="comment-button"
		disabled={!comment}
		type="submit"
		onClick={postComment} >Post</button>

		</form>
	</div>
	)
}
//  