const express = require('express')
const router = express.Router();


const {addMessage,getAllMessage} = require('../controllers/messages.js')

router.route('/addmsg').post(addMessage)
router.route('/getmsg').post(getAllMessage)


module.exports = router