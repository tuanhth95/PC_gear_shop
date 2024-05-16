import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    senderID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const conversationSchema = new mongoose.Schema({
    participants: {
        type: [String], // Lưu trữ các ID của người tham gia cuộc trò chuyện
        required: true
    },
    messages: [messageSchema]
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;