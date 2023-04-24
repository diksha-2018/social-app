import React from 'react'
import {auth,provider} from "../config/firebase";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from '../styles.module.css';
const Login = () => {
  const navigate=useNavigate();
  const signInWithGoogle= async ()=>{
    const result =await signInWithPopup(auth,provider);
console.log(result);
navigate("/");
  };
  return (
    <div className={styles.signin} >
      <p>Sign in with google to continue</p>
      <button className={styles.button} onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  );
};

export default Login;
