import {Post as IPost} from "./Main";
import {doc,getDocs,addDoc,deleteDoc,collection,query,where} from "firebase/firestore";
import {auth,db} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useState,useEffect} from "react";
import styles from '../../styles.module.css';
interface Props{
    post:IPost
}
interface Like{
    likeId:string
    userId:string
}
export const Post=(props:Props)=>{
    const {post}=props;
    const [user]=useAuthState(auth);
    const [like,setLike]=useState<Like[]|null>(null);
    const likesRef=collection(db,"likes");
    const likesDoc=query(likesRef,where("postId","==",post.id));
    const getLike=async ()=>{
       const data=await getDocs(likesDoc);
       setLike(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})));
    }
    const addLike = async  ()=>{
        try{
        const newDoc=await addDoc(likesRef,{userId:user?.uid,postId:post.id});
        if(user)
        {
            setLike((prev)=>prev?[...prev,{userId:user?.uid,likeId:newDoc.id}]:[{userId:user?.uid,likeId:newDoc.id}]);
        }
    }catch(err)
    {
        console.log(err);
    }
 };
 const removeLike = async  ()=>{
    try{
        const likeToDeleteQuery=query(likesRef,where("postId","==",post.id),where("userId","==",user?.uid));
        const likeToDeleteData=await getDocs(likeToDeleteQuery);
        const likeId=likeToDeleteData.docs[0].id;
        const likeToDelete=doc(db,"likes",likeId);
    await deleteDoc(likeToDelete);
    if(user)
    {
        setLike((prev)=>prev && prev.filter((like)=>like.likeId!==likeId));
    }
}catch(err)
{
    console.log(err);
}
};
 const  hasUserLiked=like?.find((like)=>like.userId==user?.uid);
 useEffect(()=>{
    getLike();
 },[]);
    return (
    <div className={styles.myaccount}>
        <div className={styles.posts}>
            <div className="title1">
                <p>{post.title}</p>
            </div>
            <div className={styles.bodycontent}>
                <p>{post.description}</p>
            </div>
            <div className={styles.footer}>
                <p >@{post.username}</p>
                <button onClick={hasUserLiked?removeLike:addLike}>{hasUserLiked? <>&#128078;</> : <>&#128077;</>}</button>
               {like &&<p className={styles.like}>likes:{like?.length}</p>}
            </div>
        </div>
        </div>
    );
};