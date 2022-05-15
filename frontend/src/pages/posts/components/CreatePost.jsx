import React, { useRef, useEffect, useState } from "react";
import styles from "./CreatePost.module.scss";
import { useDispatch, useSelector } from "react-redux";
import DefaultProfileImage from "../../../utils/profile-template.svg";
import Button from "../../../components/button/Button";
import { Icon } from "@iconify/react";
import useForm from "../../../hooks/useForm";
import { createPost, postActions } from "../../../store/post/postSlice";
import VALIDATORS from "../../../validators/validators";
import ErrorMessage from "../../../components/error-message/ErrorMessage";
import { Link } from "react-router-dom";

const initialState = {
  photo: {
    value: "",
    isValid: true,
  },
  text: {
    value: "",
    isValid: false,
  },
};

const CreatePost = () => {
  const { image: profileImage, uid } = useSelector((state) => state.user);
  const { isError, isLoading, errorMessages, isSuccess } = useSelector(
    (state) => state.post.post
  );
  const dispatch = useDispatch();
  const photoRef = useRef();
  const [validationError, setValidationError] = useState(null);

  const { formValues, handleFormChange, setFormValues } = useForm(initialState);

  const cancelPost = () => {
    setFormValues(initialState);
    setValidationError(null);
    dispatch(postActions.resetPost())
  };

  const handlePostSend = () => {
    if (!formValues.text.isValid) {
      setValidationError("Post content cannot be empty, please fill it in");
      return;
    }

    let postData = {
      creator: uid,
      content: formValues.text.value,
      image: formValues.photo.value,
    };

    dispatch(createPost(postData));
  };

  useEffect(() => {
    if (isSuccess) {
      cancelPost();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (formValues.text.isValid) {
      setValidationError(null);
    }
  }, [formValues.text.isValid]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__content}>
        <Link to={`/users/${uid}`}>
          <img
            src={profileImage !== "" ? profileImage : DefaultProfileImage}
            alt="Profile Image"
            className={styles.wrapper__image}
          />
        </Link>
        <div className={styles.textarea__wrapper}>
          <div className={styles.input__before}></div>
          <textarea
            className={styles.input}
            placeholder="Write what's on your mind"
            name="text"
            value={formValues.text.value}
            onChange={(e) =>
              handleFormChange(e, VALIDATORS.emptyText(e.target.value))
            }
          />
          {validationError && (
            <ErrorMessage
              message={validationError}
              className={styles["error-wrapper"]}
            />
          )}
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
            <Button
              className={styles.submit}
              onClick={handlePostSend}
              disabled={isLoading}
            >
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
    </div>
  );
};

export default CreatePost;
