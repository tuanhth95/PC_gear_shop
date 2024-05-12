import { useQueries } from '@tanstack/react-query';
import { Card } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { updateUser} from "../../redux/slices/userSlide";
import * as UserService from "../../services/UserService";
import "./style.css"

export default function AdminChatBox() {
  const user = useSelector((state) => state.user);
  const [userID, setUserId] = useState("");

  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState([]);
  const [selectedChat, setSelectedChat] = useState(0);
  const bottomRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const getAllConversation = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/conversation/get-all");
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw new Error('Failed to fetch conversations');
    }
  };

  
  useEffect(() => {
    getAllConversation()
      .then((data) => setChat(data))
      .catch((error) => console.error('Error fetching conversations:', error));
  }, []); 

  const queries = useQueries({
    queries: [
      { queryKey: ['chat'], queryFn: getAllConversation, staleTime: 1000 * 60 }
    ]
  });

  useEffect(() => {
    if (selectedChat !== 0) {
      axios.get(`http://localhost:3001/api/conversation/${selectedChat}`)
        .then((res) => {
          setMessages(res.data)
        })
        .catch((err) => { console.log(err) });
    }
  }, [selectedChat, messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      axios.post(`http://localhost:3001/api/conversation/message/${selectedChat}`, {
        senderID: user.id,
        messageContent: newMessage
      })
        .then((res) => {
          console.log('Message sent successfully:', res.data);
          setMessages([...messages, res.data]);
          setNewMessage('');


          bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  };
  return (
    <div className='inbox-wrapper'>
      <div className="inbox-list">
      {
        chat.map((c, index) => (
          <Card key={index} className="chat" onClick={(e) => setSelectedChat(c.participants)}>
            {/* <img src={c.avatar} alt={c.username} className="avatar" /> */}
            <div className="username">{c.username}</div>
          </Card>
        ))
      }
      </div>

      <div className='inbox'>
        {selectedChat !== 0 && (
          <>
            {/* <div className="inbox-header">{messages.username}</div> */}

            <div className="conversation">
              {messages && messages.messages && messages.messages.map((m, index) => (
                <div key={index} className={`message ${m.senderID === user.id ? 'my-message' : 'user-message'}`}>
                  <p>{m.content}</p>
                  <p>{new Date(m.date).toLocaleString()}</p>
                </div>
              ))}
              <div className="lastMessage" ref={bottomRef} />
            </div>

            <div className="send-text-section">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Gửi</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
