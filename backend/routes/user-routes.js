const { Router } = require('express')
const userControllers = require('../contollers/user-controller')

const router = Router()

router.post('/signup', userControllers.users_signup)
router.post('/login', userControllers.users_login)
router.get('/:id', userControllers.users_getUser)
// router.patch('/:id', userControllers.users_editUser) // add later

module.exports = router