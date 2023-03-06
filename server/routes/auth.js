const express = require('express')
const router = express.Router();


const {registerUser,loginUser, setAvatar, getUsers} = require('../controllers/auth')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/setAvatar/:id').post(setAvatar)
router.route('/getUsers/:id').get(getUsers)

module.exports = router