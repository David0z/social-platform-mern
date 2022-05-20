import { useDispatch } from "react-redux"
import { voteForPost } from "../../../store/post/postSlice";


const useVote = (action, userId, postId) => {
  const dispatch = useDispatch()

  const handleVote = () => {
    dispatch(voteForPost({
      postId,
      body: {
        userId,
        action
      }
    }))
  }

  return { handleVote }
}

export default useVote