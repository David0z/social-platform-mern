import PostPreview from '../post-preview/PostPreview'
import styles from './PostsList.module.scss'

const PostsList = ({posts}) => {
  return (
    <div className={styles.wrapper}>
      {posts.map(post => <PostPreview post={post} key={post._id}/>)}
    </div>
  )
}

export default PostsList