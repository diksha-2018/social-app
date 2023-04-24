import React from 'react'
import {Link} from "react-router-dom";
import {auth} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {signOut} from "firebase/auth";
import './navbar.css';
const Navbar = () => {
    const [user]=useAuthState(auth);
    const signUserOut= async ()=>{
     await signOut(auth);
    }
  return (
    <div className="navbar">
      <Link className="link1" to="/">Home</Link>
      {!user?(<Link className="login" to="/login">Login</Link>):
      (<Link className="login" to="/createpost">Create Post</Link>)}
      <div className="div2">
        {user && (
            <>
            <img src="https://img.icons8.com/material-outlined/512/guest-male.png" width="20px" height="20px"/>
            <p className="user">{user?.displayName}</p>
            <button className="signout" onClick={signUserOut}>signout</button>
            </> )}
      </div>
    </div>
  )
}

export default Navbar;
