import styles from '../../styles.module.css';
import {getDocs,collection} from 'firebase/firestore';
import {auth,db} from '../../config/firebase';
import {useState,useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import { Post } from "./post";
export interface Post{
  id:string;
  userId:string;
  title:string;
  username:string;
  description:string;
}
export const Main = () => {
  const [user]=useAuthState(auth);
  const [postLists,setPostsList]=useState<Post[] |null>(null);
  const postRef=collection(db,"posts");
  const getPost=async ()=>{
    const data=await getDocs(postRef);
    setPostsList(data.docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[]);
  };
  useEffect(()=>{
    getPost();
  },[]);
  return (
    <div className={styles.hometext}>
      {!user ? <p>Welcome! Let's get started .....</p>:
      (postLists?.map((post)=>(<Post post={post}/>)))}
    </div>
  )
}


