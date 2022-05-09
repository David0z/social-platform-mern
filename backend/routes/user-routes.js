const { Router } = require('express')
const userControllers = require('../contollers/user-controller')

const router = Router()

router.post('/', userControllers.users_create)
router.get('/:id', userControllers.users_getUser)
router.patch('/:id', userControllers.users_editUser)

module.exports = router