import React from "react";
import styles from "./CreatePost.module.scss";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const { image: profileImage } = useSelector(state => state.user)

  // add user fetch for image on reupload

  return (
    <div className={styles.wrapper}>
      <img src={profileImage} alt="Profile Image" className={styles.wrapper__image}/>
      <div className={styles.textarea__wrapper}>
        <div className={styles.input__before}></div>
        <textarea className={styles.input} placeholder="Write what's on your mind" />
      </div>
    </div>
  );
};

export default CreatePost;
