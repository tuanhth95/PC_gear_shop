const express = require("express");
const router = express.Router()
const conversationController = require('../controllers/ConversationController')

router.get('/get-all', conversationController.getAllConversation);
router.get('/:userID', conversationController.getConversationByUserID);
router.post('/message/:userID', conversationController.createMessage)


module.exports = router