import PostSkeleton from './PostSkeleton'
import styles from './PostSkeletonList.module.scss'

const PostSkeletonList = ({number}) => {
  return (
    <div className={styles.wrapper}>
      {[...Array(number)].map((number, i) => <PostSkeleton key={i}/>)}
    </div>
  )
}

export default PostSkeletonList