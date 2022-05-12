import React, { useRef } from "react";
import styles from "./CreatePost.module.scss";
import { useSelector } from "react-redux";
import DefaultProfileImage from "../../../utils/profile-template.svg";
import Button from "../../../components/button/Button";
import { Icon } from "@iconify/react";
import useForm from "../../../hooks/useForm";

const CreatePost = () => {
  const { image: profileImage } = useSelector((state) => state.user);
  const photoRef = useRef();

  const { formValues, handleFormChange, setFormValues } = useForm({
    photo: {
      value: "",
      isValid: true,
    },
    text: {
      value: "",
      isValid: true,
    },
  });

  const cancelPost = () => {
    const keys = Object.keys(formValues);
    keys.forEach((key) => {
      setFormValues((prevState) => ({
        ...prevState,
        [key]: {
          value: "",
          isValid: true,
        },
      }));
    });
  };

  return (
    <div className={styles.wrapper}>
      <img
        src={profileImage !== "" ? profileImage : DefaultProfileImage}
        alt="Profile Image"
        className={styles.wrapper__image}
      />
      <div className={styles.textarea__wrapper}>
        <div className={styles.input__before}></div>
        <textarea
          className={styles.input}
          placeholder="Write what's on your mind"
          name="text"
          value={formValues.text.value}
          onChange={handleFormChange}
        />
        <div className={styles.buttons__wrapper}>
          <input
            type="file"
            name="photo"
            ref={photoRef}
            value={formValues.photo.value}
            onChange={handleFormChange}
          />
          <Button
            className={styles["post-button"]}
            onClick={() => photoRef.current.click()}
          >
            <Icon
              icon="icon-park-outline:picture-one"
              className={styles["post-button__icon"]}
            />
            Add picture
          </Button>
          <Button
            className={styles["post-button--cancel"]}
            onClick={cancelPost}
          >
            Chancel
          </Button>
          <Button className={styles.submit}>
            <Icon
              icon="ant-design:send-outlined"
              className={styles["icon--one"]}
            />
            <Icon
              icon="fluent:send-24-filled"
              className={styles["icon--two"]}
            />
            SENT POST
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
