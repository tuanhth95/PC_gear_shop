import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Card, Rate} from 'antd';
import axios from 'axios'

import { Input } from 'antd';

const { TextArea } = Input;

export default function Review() {
  // const [data, setData] = useState(dataReview);
  const textRef = useRef();
  const [rating, setRating] = useState(5);
  // const [productID, setProductID]= useState(1);
  // const [userID, setUserID]= useState(1);
  const productID = 1;
  const userID = 2;

  const [data, setData] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/review/product/${productID}`); 
        const reviewsWithUserInfo = response.data.map(review => {
          return {
            ...review,
            userImage: review.userImage, 
            userName: review.userName,
            replies: review.replies.map(reply => ({
              ...reply,
              userNameReply: reply.userNameReply,
              userImageReply: reply.userImageReply
            })),

          };
        });
        setData(reviewsWithUserInfo);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
  
    fetchReviews();
  }, [productID]);


  const formatDate= (date) =>{
    const dateObject = new Date(date);
    const day = String(dateObject.getUTCDate()).padStart(2, '0');
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    const year = dateObject.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }


  const handleCreateReview = () => {
    const body = {
      rate: rating,
      contentReview: textRef.current.value
    }

    axios.post(`http://localhost:3001/api/review/create-review/${productID}/${userID}`, body)
      .then((res) => {
        console.log('Đăng đánh giá thành công');
        window.location.reload();
        setData([res.data.review, ...data]);
        textRef.current.value = '';
      })
      .catch((err) => { console.log(err) })
  }

  


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
  const handleReply = (reviewId) => {
    const body = {
      content: textReplyRef.current.value,
    };
  
    axios.post(`http://localhost:3001/api/review/${reviewId}/${userID}/reply`, body)
      .then((res) => {
        console.log('Gửi phản hồi thành công');
        const updatedData = data.map(review => {
          if (review._id === reviewId) {
            return {
              ...review,
              _doc: {
                ...review._doc,
                replies: [...review._doc.replies, {
                  ...res.data.reply,
                }]
              }
            };
          }
          return review;
        });
        window.location.reload();
        setData(updatedData);
        setReply(false);
        textRef.current.value = '';
      })
      .catch((err) => { console.log(err) });
  };
  // const averageRating = Math.ceil(data.reduce((total, review) => total + review._doc.rate, 0) / data.length);

const averageRating = parseFloat((data.reduce((total, review) => total + review._doc.rate, 0)/ data.length).toFixed(1));
function roundRating(averageRating) {
  const decimalPart = averageRating - Math.floor(averageRating);
  if (decimalPart > 0) {
      if (decimalPart > 0.5) {
          return Math.ceil(averageRating);
      } else {
          return Math.floor(averageRating) + 0.5;
      }
  }
  return 0;
}
let roundedRating = roundRating(averageRating);

  return (
    <div style={{marginLeft: 'auto', marginRight: 'auto', width: '800px'}}>
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
                        <Avatar src={review.userImage} alt={review.userName} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                        <p style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>{review.userName}</p>
                      </div>
                      <p>{formatDate(review._doc.date)}</p>
                    </div>
                    <div>
                      <Rate defaultValue={review._doc.rate} disabled />
                    </div>
                    <div>
                      {review._doc.contentReview}
                    </div>
                    
                    {review.replies && review.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} style={{ marginLeft: '20px', padding: 'inherit' }}>
                        <div style={{ display: 'flex', verticalAlign: 'middle', justifyContent: 'space-between', marginBottom: '0px'}}>
                          <div style={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto', verticalAlign: 'middle' }}>
                            <Avatar src={reply.userImageReply} alt={reply.userNameReply} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                            <p style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>{reply.userNameReply}</p>
                          </div>
                          {/* <p style={{ fontWeight: 'bold' }}>{reply.userNameReply}</p> */}
                          <p>{formatDate(reply._doc.date)}</p>
                        </div>
                        <p style={{}}>{reply._doc.content}</p>
                        
                      </div>
                    ))}
                    {!reply && (
                        <Button onClick={() => {setReplyTo(review._doc._id); setReply(true)}} style={{float:'right'}}>Trả lời</Button>
                        
                    )}
                    {reply && replyTo === review._doc._id && (
                      <div>
                        <TextArea rows={2} ref={textReplyRef} placeholder="Nhập phản hồi của bạn" onChange={(e) => { textReplyRef.current.value = e.target.value; }}/>
                        <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto',marginTop: '5px', }}>
                          <Button style={{backgroundColor: '#1A93FF', marginRight: '5px'}} 
                          onClick={() => handleReply(review._doc._id)} >Gửi</Button>
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
            onChange={(e) => { textRef.current.value = e.target.value; }}/>
            <Button type="primary" danger onClick={() => { handleCreateReview() }} style={{marginTop: '10px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
              Đăng đánh giá
            </Button>
           
         </div>     
        
    </div>
  )
}
export default Review;
