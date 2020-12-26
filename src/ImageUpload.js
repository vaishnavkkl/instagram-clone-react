
import React,{useState} from "react";
import Button from '@material-ui/core/Button';
import {storage, db } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css"




export default function ImageUpload({username}){

	const [caption, setCaption] = useState("");
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);

	const handleChanges =(e)=>{ //code snipet for image upload
		if(e.target.files[0]){
			setImage(e.target.files[0]);
		}
	}

	const handleUpload=()=>{

		const uploadTask = storage.ref(`images/${image.name}`).put(image); //image upload 
		uploadTask.on("state_changed",
		 (snapshot) =>{
			//progress bar function
			const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100);
			setProgress(progress);
		},
		(error) =>{
			//error function
			console.log(error);
			alert(error.message);
		},
		()=>{
			storage.ref("images").child(image.name).getDownloadURL()
			.then((url) =>{
				db.collection("posts").add({
					timestamp:firebase.firestore.FieldValue.serverTimestamp(),
					caption:caption,
					imageUrl:url,
					username:username,
					
				});
				setProgress(0);
				setCaption("");
				setImage(null);
			});
		}
		);
	}
	return <div className="image-upload">
		
		<p className="post-para"><strong>Post</strong></p>
		<input className="image-upload-input" type="text"  onChange={ event=> setCaption(event.target.value)} placeholder="enter a caption" />
		<input className="image-upload-browse" type="file" onChange={handleChanges} />
		<Button className="post-button" variant="contained" onClick={handleUpload} ><strong>Upload</strong></Button>
		<progress className="image-upload-progress" value={progress} max="100" ></progress>
		</div>
}