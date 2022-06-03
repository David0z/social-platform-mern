const { Router } = require('express')
const postsControllers = require('../contollers/posts-controller')
const fileUpload = require('../middleware/file-upload')
const { authMiddleware } = require('../middleware/auth')

const router = Router()

router.get('/', postsControllers.posts_getAll)
router.post('/', authMiddleware, fileUpload.single('image'), postsControllers.posts_postNew)
router.get('/:id', postsControllers.posts_getSingle)
// router.patch('/:id', authMiddleware, postsControllers.posts_editSingle)
router.post('/:id', authMiddleware, postsControllers.posts_commentSingle)
router.post('/vote/:id', authMiddleware, postsControllers.posts_voteForSingle)
router.get('/votes/:id', postsControllers.posts_getVotes)
router.get('/comments/:id', postsControllers.posts_getComments)
router.get('/hot/:hotNumber', postsControllers.posts_getHotPosts)

module.exports = router