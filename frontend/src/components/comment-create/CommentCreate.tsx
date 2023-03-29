import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CommentCreate.module.scss";
import Button from "../button/Button";
import ErrorMessage from "../error-message/ErrorMessage";
import VALIDATORS from "../../validators/validators";
import { commentPost, postActions } from "../../store/post/postSlice";
import LoadingBar from "../loading-bar/LoadingBar";
import { Icon } from "@iconify/react";
import ProfileImage from "../profile-image/ProfileImage";

const initialState = {
  text: {
    value: "",
    isValid: false,
  },
};

const CommentCreate = ({ postId }) => {
  const dispatch = useDispatch();
  const { image, uid } = useSelector((state) => state.user);
  const { isError, isLoading, isSuccess } = useSelector(
    (state) => state.post.createdComment
  );

  const [validationError, setValidationError] = useState(null);

  const { formValues, handleFormChange, setFormValues } = useForm(initialState);

  const resetComment = () => {
    setFormValues(initialState);
    setValidationError(null);
    dispatch(postActions.resetComment());
  };

  const handleCommentSend = () => {
    if (!formValues.text.isValid) {
      setValidationError("Comment content cannot be empty, please fill it in");
      return;
    }

    let commentData = {
      body: {
        author: uid,
        body: formValues.text.value,
      },
      postId,
    };

    dispatch(commentPost(commentData));
  };

  useEffect(() => {
    if (isSuccess) {
      resetComment();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (formValues.text.isValid) {
      setValidationError(null);
    }
  }, [formValues.text.isValid]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <ProfileImage
          profileImage={image}
          alt="User Image"
          className={styles["user-image"]}
        />
        <div className={styles.content}>
          <h3 className={styles.content__title}>Write new comment:</h3>
          <textarea
            className={styles.content__input}
            name="text"
            value={formValues.text.value}
            onChange={(e) =>
              handleFormChange(e, VALIDATORS.emptyText(e.target.value))
            }
          />
          {validationError && (
            <ErrorMessage
              message={validationError}
              // className={styles["error-wrapper"]}
            />
          )}
          <Button
            className={styles.content__button}
            onClick={handleCommentSend}
            disabled={isLoading}
          >
            {isLoading && <Icon icon="eos-icons:loading" />}
            Send comment
          </Button>
        </div>
      </div>
      {isLoading && <LoadingBar />}
    </div>
  );
};

export default CommentCreate;
