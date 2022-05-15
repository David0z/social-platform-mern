import styles from './CommentsList.module.scss'
import Comment from '../comment/Comment'

const CommentsList = ({ comments }) => {
  return (
    <div className={styles.wrapper}>
      {comments.map(comment => <Comment comment={comment} key={comment._id}/>)}
    </div>
  )
}

export default CommentsList