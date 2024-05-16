import Conversation from '../models/Conversation.js'
import User from '../models/UserModels.js'

const getAllConversation = async () => {
    try {
        // Lấy tất cả người dùng
        const users = await User.find({});

        // Duyệt qua mỗi người dùng và lấy các cuộc trò chuyện của họ
        const allConversations = await Promise.all(users.map(async (user) => {
            const conversations = await Conversation.find({ participants: user._id });

            // Trích xuất thông tin tên người dùng và hình ảnh đại diện từ các cuộc trò chuyện
            const conversationsWithUserInfo = conversations.map((conversation) => {
                return {
                    participants: conversation.participants,
                    username: user.username, // Lấy tên người dùng từ thông tin của user
                    avatar: user.avatar, // Lấy hình ảnh đại diện từ thông tin của user
                    messages: conversation.messages // Đảm bảo bạn đã có messages từ conversation
                };
            });

            // Trả về các cuộc trò chuyện của người dùng hiện tại với thông tin tên và avatar
            return conversationsWithUserInfo;
        }));

        // Tổng hợp tất cả các cuộc trò chuyện thành một mảng lớn
        const allConversationsFlat = allConversations.flat();

        return allConversationsFlat;
    } catch (error) {
        console.error('Error fetching conversations:', error);
        throw new Error('Failed to fetch conversations');
    }
};


const getConversationByUserID = async (userID) => {
    try {
        const conversation = await Conversation.findOne({ participants: userID });
        return conversation;
    } catch (error) {
        throw new Error('Lỗi khi lấy cuộc trò chuyện: ' + error.message);
    }
};

const createMessage = async (userID, senderID, messageContent) => {
    try {
        let conversation = await getConversationByUserID(userID);

        console.log('conversation:', conversation); // Kiểm tra giá trị của conversation

        if (!conversation) {
            // Nếu cuộc trò chuyện chưa tồn tại, tạo một cuộc trò chuyện mới
            conversation = new Conversation({ participants: [userID] });
        }

        // Thêm tin nhắn vào cuộc trò chuyện
        conversation.messages.push({ content: messageContent, senderID: senderID });

        // Lưu cuộc trò chuyện vào cơ sở dữ liệu
        await conversation.save();

        return { success: true, message: 'Tin nhắn đã được gửi' };
    } catch (error) {
        throw new Error('Lỗi khi gửi tin nhắn: ' + error.message);
    }
};

export default {
    getAllConversation,
    getConversationByUserID,
    createMessage
};