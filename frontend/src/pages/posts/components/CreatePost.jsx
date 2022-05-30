import React, { useRef, useEffect, useState } from "react";
import styles from "./CreatePost.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button/Button";
import { Icon } from "@iconify/react";
import useForm from "../../../hooks/useForm";
import { createPost, postActions } from "../../../store/post/postSlice";
import VALIDATORS from "../../../validators/validators";
import ErrorMessage from "../../../components/error-message/ErrorMessage";
import { Link } from "react-router-dom";
import LoadingBar from '../../../components/loading-bar/LoadingBar'
import ProfileImage from "../../../components/profile-image/ProfileImage";

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
    dispatch(postActions.resetPost());
  };

  const handlePostSend = () => {
    if (!formValues.text.isValid) {
      setValidationError("Post content cannot be empty, please fill it in");
      return;
    }

    // let postData = {
    //   creator: uid,
    //   content: formValues.text.value,
    //   image: formValues.photo.value,
    // };

    const postData = new FormData();
    postData.append('creator', uid)
    postData.append('content', formValues.text.value)
    postData.append('image', formValues.photo.value)

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
          <ProfileImage profileImage={profileImage} className={styles.wrapper__image} alt="Profile Image"/>
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
              disabled={isLoading}
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
              disabled={isLoading}
            >
              Chancel
            </Button>
            <Button
              className={styles.submit}
              onClick={handlePostSend}
              disabled={isLoading}
            >
              {!isLoading ? (
                <>
                  <Icon
                    icon="ant-design:send-outlined"
                    className={styles["icon--one"]}
                  />
                  <Icon
                    icon="fluent:send-24-filled"
                    className={styles["icon--two"]}
                  />
                </>
              ) : (
                <Icon icon="eos-icons:loading" className={styles.icon} />
              )}
              SENT POST
            </Button>
          </div>
        </div>
      </div>
      {isLoading && (
        <LoadingBar />
      )}
    </div>
  );
};

export default CreatePost;
