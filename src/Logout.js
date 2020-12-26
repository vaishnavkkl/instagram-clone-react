
import React,{useState,useEffect} from 'react';

import TextField from '@material-ui/core/TextField';
import "./Modal.css";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {auth} from "./firebase";
import "./Logout.css";

import ImageUpload from "./ImageUpload";

export default function Logout({user, handleOpen, handleOpen1}){
	return <div className="logout">
		{user?(
         <Button className="logout-button" variant="outlined" type="button" onClick={()=> auth.signOut()} > {/* account sign out */}
        LogOut
      </Button>):
      (
      <div className="app-login">
       <Button className="logout-button" variant="outlined" type="button" onClick={handleOpen}>
        Sign Up
      </Button>
      <Button className="logout-button" variant="outlined" type="button" onClick={handleOpen1}>
        Sign In
      </Button></div>
      )}
	</div>
}