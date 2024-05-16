import express from "express"
const router = express.Router()
import conversationController from '../controllers/ConversationController.js'

router.get('/get-all', conversationController.getAllConversation);
router.get('/:userID', conversationController.getConversationByUserID);
router.post('/message/:userID', conversationController.createMessage)


export default router