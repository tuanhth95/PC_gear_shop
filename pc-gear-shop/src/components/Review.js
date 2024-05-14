import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Card, Modal, Rate} from 'antd';
import axios from 'axios'
import Loading from "../components/LoadingComponent/Loading";
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser} from "../redux/slices/userSlide";
import * as UserService from "../services/UserService";

const { TextArea } = Input;

const Review = ({productId}) =>{
  // const dispatch = useDispatch();
  // // const [userData, setUserData] = useState(null);

  const user = useSelector((state) => state.user);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/review/product/${productId}`); 
      const reviewsWithUserInfo = response.data.map(review => {
        return {
          ...review,
          userAvatar: review.userAvatar, 
          userName: review.userName,
          replies: review.replies.map(reply => ({
            ...reply,
            userNameReply: reply.userNameReply,
            userAvatarReply: reply.userAvatarReply
          })),

        };
      });
      setData(reviewsWithUserInfo);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  useEffect(() => {
    console.log("User:", user);
    setUserId(prevUserId => {
      console.log(prevUserId); 
      return user?.id; 
    });
  }, [user?.id]);
    // const userId = localStorage.getItem('userID');

  const textRef = useRef();
  const [textValue, setTextValue] = useState('');
  const [rating, setRating] = useState(5);
 

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   setIsLoggedIn(userId);
  // }, [userId]);

  const [data, setData] = useState([])

  useEffect(() => {
    fetchReviews();
  }, [productId, data]);


  const formatDate= (date) =>{
    const dateObject = new Date(date);
    const day = String(dateObject.getUTCDate()).padStart(2, '0');
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    const year = dateObject.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }

  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleCreateReview = () => {

    if (!userId) {
      setShowLoginModal(true);
      return;
    } 
    const body = {
      rate: rating,
      // contentReview: textRef.current.value
      contentReview: textValue
    }

    axios.post(`http://localhost:3001/api/review/create-review/${productId}/${userId}`, body)
      .then((res) => {
        console.log('Đăng đánh giá thành công');
        if (res.data && res.data.review) {
          const newReview = res.data.review;
          setData([newReview, ...data]); 
          textRef.current.value = ''; 
          setTextValue('');
          // fetchReviews(); 
        }
      })
      .catch((err) => {
        console.error('Lỗi tạo đánh giá', err);
      });
  }
  const handleLogin = () => {
    window.location.href = '/signin';
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  


  const [visibleCount, setVisibleCount] = useState(3); 

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 3); 
  };

  // Lấy 5 card gần nhất
  const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestData = sortedData.slice(0, visibleCount);


  const [replyTo, setReplyTo] = useState(null);
  const [reply, setReply] = useState(false);
  

  const textReplyRef = useRef();
  const [textReplyValue, setTextReplyValue] = useState('');
  

  const handleReply = (reviewId) => {
    if (!userId) {
      setShowLoginModal(true);
      return;
    } 
    // setUserId(user.data._id);
    const body = {
      content: textReplyValue,
    };
    
    // const userIdFromStorage = localStorage.getItem('userId')
    // console.log(userIdFromStorage);
    // console.log(reviewId);
    // console.log(textReplyRef.current.value);
  
    axios.post(`http://localhost:3001/api/review/${reviewId}/${userId}/reply`, body)
      .then((res) => {
        console.log('Gửi phản hồi thành công');
        if (res.data && res.data.reply) {
          const newReply = res.data.reply;
  
          const updatedData = data.map(review => {
            if (review._id === reviewId) {
              return {
                ...review,
                replies: [...review.replies, newReply]
              };
            }
            return review;
          });
          // window.location.reload();
          // setLoading(true);
          setData(updatedData);
  
          setReply(false);
          textReplyRef.current.value = '';
          setTextReplyValue('');
          
        } else {
          console.error('Không có dữ liệu phản hồi mới từ API');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi gửi phản hồi:', error);
      });
  };
  // const averageRating = Math.ceil(data.reduce((total, review) => total + review._doc.rate, 0) / data.length);

const averageRating = parseFloat((data.reduce((total, review) => total + review.rate, 0)/ data.length).toFixed(1));
function roundRating(averageRating) {
  const decimalPart = averageRating - Math.floor(averageRating);
  if (decimalPart >= 0.25) {
      if (decimalPart >= 0.75) {
          return Math.ceil(averageRating);
      } else {
          return Math.floor(averageRating) + 0.5;
      }
  }
  return Math.floor(averageRating);
}
let roundedRating = roundRating(averageRating);

  return (
    <div style={{marginLeft: 'auto', marginRight: 'auto', width: '900px'}}>
         <div className='review' style={{marginTop:'2rem', marginBottom:'1rem', textAlign:'justify'}}>
              <h3 style={{textAlign:'center'}}> Đánh giá sản phẩm </h3>
              {latestData && latestData.length ? (
              <div>
                <h5 style={{fontSize: '25px'}}>
                  Tổng quan:    
                  <span style={{marginLeft: '10px'}}>{averageRating}</span>
                  <Rate value={roundedRating} style={{marginLeft: '10px'}} allowHalf={true} disabled />
                  ({data.length} đánh giá)
                </h5>
                
                {latestData.map((review, index) => (
                  <Card className='listReview' style={{ padding: '10px', marginBottom: '5px' }} key={index}>
                    <div className='infoReview' style={{ display: 'flex', verticalAlign: 'middle', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto', verticalAlign: 'middle' }}>
                        <Avatar src={review.userAvatar} alt={review.userName} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                        <p style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>{review.userName}</p>
                      </div>
                      <p>{formatDate(review.date)}</p>
                    </div>
                    <div>
                      <Rate defaultValue={review.rate} disabled />
                    </div>
                    <div>
                      {review.contentReview}
                    </div>
                    
                    {review.replies && review.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} style={{ marginLeft: '20px', padding: 'inherit' }}>
                        <div style={{ display: 'flex', verticalAlign: 'middle', justifyContent: 'space-between', marginBottom: '0px'}}>
                          <div style={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto', verticalAlign: 'middle' }}>
                            <Avatar src={reply.userAvatarReply} alt={reply.userNameReply} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                            <p style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>{reply.userNameReply}</p>
                          </div>
                          {/* <p style={{ fontWeight: 'bold' }}>{reply.userNameReply}</p> */}
                          <p>{formatDate(reply.date)}</p>
                        </div>
                        <p style={{}}>{reply.content}</p>
                        
                      </div>
                    ))}
                    {!reply && (
                        <Button onClick={() => {setReplyTo(review._id); setReply(true)}} style={{float:'right'}}>Trả lời</Button>
                        
                    )}
                    {reply && replyTo === review._id && (
                      <div>
                        <TextArea rows={2} ref={textReplyRef} placeholder="Nhập phản hồi của bạn" 
                        value={textReplyValue}
                        onChange={(e) => setTextReplyValue(e.target.value)}/>
                        <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto',marginTop: '5px', }}>
                          <Button style={{backgroundColor: '#1A93FF', marginRight: '5px'}} 
                          onClick={() => handleReply(review._id)} >Gửi</Button>
                          <Button onClick={() => setReply(false)} style={{float:'right'}}>Đóng</Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
                {data.length > visibleCount && (
                  <Button onClick={handleShowMore} style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}>Xem thêm</Button>
                )}
              </div>
              ):(
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <p style={{ fontStyle: 'italic' , fontSize: '15px'}}>{'Chưa có đánh giá cho sản phẩm này'}</p>
                  </div>
              )}
         </div>
         <div>
            <h5 style={{textAlign: 'justify'}}>Viết đánh giá</h5>
            <div className='review-content-rating' style={{textAlign: 'justify', fontSize: '20px'}}>
              1: Rất không hài lòng → 5: Rất hài lòng
              <Rate defaultValue={5} onChange={(value) => {setRating(value)}} />
            </div>
            <TextArea rows={4} ref={textRef} label="Nội dung" type='text' className="insert-review-text" maxLength={200} 
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}></TextArea>
            <Button type="primary" danger onClick={() => { handleCreateReview() }} style={{marginTop: '10px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
              Đăng đánh giá
            </Button>
           
         </div>   
         <Modal
            title="Yêu cầu đăng nhập"
            visible={showLoginModal}
            onCancel={handleCloseModal}
            footer={[
              <Button key="cancel" onClick={handleCloseModal}>
                OK
              </Button>,
              <Button key="login" type="primary" onClick={handleLogin}>
                Đăng nhập
              </Button>
            ]}
          >
            Bạn cần đăng nhập để tiếp tục
          </Modal>  
        
    </div>
  )
}
export default Review