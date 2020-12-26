import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import "./Modal.css";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {auth,db} from "./firebase";
import Posts from "./Posts";
import ImageUpload from "./ImageUpload";
import Logout from "./Logout";
import firebase from "firebase";





function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {

  


  const [post, setPost] = useState([]);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [ username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user,setUser] = useState(null);

  
   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // if user has logged in...
        setUser(authUser);

      } else {
        // if user has logged out... 
        setUser(null);
      }
      
    })

    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  useEffect(()=>{
//begginng of page ,this code runs
  db.collection('posts')
  .orderBy("timestamp",'desc')
  .onSnapshot(snapshot =>{ //when the posts updated the snapshot automatically runs 
  setPost(snapshot.docs.map(doc=>({
    id:doc.id,
    post:doc.data()
  })));
  })
},[]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => {
    setOpenSignIn(true);
  };

  const handleClose1 = () => {
    setOpenSignIn(false);
  };

  const signUp = (event)=>{
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) =>{
       return authUser.user.updateProfile({
         displayName:username,
      });
    })
    .catch((error)=> alert(error.message));
   setOpen(false);
  }


  const signIn = (event) =>{
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message));
    setOpenSignIn(false);

  };
  

  

  return (



    <div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
      <form className="app-signup">
      <center><img  className="modal-header-image" src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png" alt="logo" /></center>
      <Input 
      type="text"
      placeholder="username"
      value={username} 
      onChange={(e) => setUsername(e.target.value)} />
       <Input 
      type="email"
      placeholder="email"
      value={email} 
      onChange={(e) => setEmail(e.target.value)} />
       <Input 
      type="password"
      placeholder="password"
      value={password} 
      onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" onClick={signUp} >Sign Up</Button></form>

    </div>
      </Modal>
      


      <Modal
        open={openSignIn}
        onClose={handleClose1}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
      <form className="app-signup">
      <center><img  className="modal-header-image" src="https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png" alt="logo" /></center>
      
       <Input 
      type="email"
      placeholder="email"
      value={email} 
      onChange={(e) => setEmail(e.target.value)} />
       <Input 
      type="password"
      placeholder="password"
      value={password} 
      onChange={(e) => setPassword(e.target.value)} />
      <Button variant="outlined" type="submit" onClick={signIn} >Sign In</Button></form>
  
    </div>
      </Modal>
      <div className="logout-button" >
     <Logout user={user}  handleOpen={ handleOpen} handleOpen1={handleOpen1} />
      </div>
      
      { post.map(({id,post})=> (
        <Posts key={id} postId={id} user={user}  username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      )
      )} 

      

      {user?.displayName? (
         <ImageUpload username={user.displayName} />
         ):(
         <h3>login to upload</h3>
         )}
    </div>
  );
}

