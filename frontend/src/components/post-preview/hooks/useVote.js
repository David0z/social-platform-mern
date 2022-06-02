import { useDispatch, useSelector } from "react-redux";
import { voteForPost } from "../../../store/post/postSlice";

const useVote = (action, userId, postId) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const handleVote = () => {
    if (!token) return;
    dispatch(
      voteForPost({
        postId,
        body: {
          userId,
          action,
        },
      })
    );
  };

  return { handleVote };
};

export default useVote;
