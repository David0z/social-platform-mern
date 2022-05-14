import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { postActions, getSinglePost } from '../../store/post/postSlice'
import styles from './Post.module.scss'
import PostPreview from '../../components/post-preview/PostPreview'
import { useParams } from 'react-router-dom'

const Post = () => {
  const dispatch = useDispatch()
  const {id: postId} = useParams()
  const {post, isLoading, isError, isSuccess} = useSelector(state => state.post.post)

  useEffect(() => {
    dispatch(getSinglePost(postId))

    return () => dispatch(postActions.resetPost())
  }, [dispatch])

  return (
    <div className={styles.wrapper}>
      {!isLoading && !isError && post && <PostPreview post={post}/>}
    </div>
  )
}

export default Post