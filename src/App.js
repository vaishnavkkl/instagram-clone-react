
import './App.css';
import Posts from "./Posts";
import firebase from './firebase';
import React ,{useState, useEffect} from "react";
import { db } from "./firebase";
import SimpleModal from "./Modal";
import Logout from "./Logout";
import InstagramEmbed from 'react-instagram-embed';


function App() {


  return (
    <div className="App">
    
      {/* Header*/} 
      <div className="app-header">
        <img  className="app-header-image" src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png" alt="logo" />
      </div>
      <SimpleModal />
      
      <InstagramEmbed
          url='https://www.instagram.com/p/CJMDPxgJKjK/?utm_source=ig_web_copy_link'
          
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
/>
      
      {/* posts*/}
      
    </div>
  );
}

export default App;
