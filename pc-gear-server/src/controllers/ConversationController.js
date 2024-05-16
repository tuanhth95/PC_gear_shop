import conversationService from '../services/ConversationService.js'
import userService from '../services/userService.js'

const getAllConversation = async (req, res) => {
    try {
        const conversations = await conversationService.getAllConversation();
        res.json(conversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
};

const getConversationByUserID = async (req, res) => {
    const userID = req.params.userID;
    try {
        const conversations = await conversationService.getConversationByUserID(userID);
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createMessage = async (req, res) => {
    const { userID } = req.params;
    const { senderID, messageContent } = req.body;
    try {
        const result = await conversationService.createMessage(userID, senderID, messageContent);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getAllConversation,
    getConversationByUserID,
    createMessage
};