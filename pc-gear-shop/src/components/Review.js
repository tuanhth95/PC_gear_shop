import React, { useEffect, useRef, useState } from 'react'
import { dataReview } from './data';
import { Avatar, Button, Card, Rate} from 'antd';
import {TextField  } from '@mui/material'
import axios from 'axios'

export default function Review() {
  // const [data, setData] = useState(dataReview);
  const textRef = useRef()
  const [rating, setRating] = useState(5);

  const [data, setData] = useState([])

  useEffect(() => {
        axios.get(`http://localhost:3001/api/review/get-all-review`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => { console.log(err) })
  }, [data])

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
      contentReview: textRef.current.value,
      user: {
            id: 1,
            image: "https://th.bing.com/th/id/OIP.5dJYOihKRkSgH_j7b3LUpQHaEo?rs=1&pid=ImgDetMain",
            name: "Trinh"
        },
      product: {
            id:1, 
            name: "Bàn Phím Cơ MonsGeek MG75 Black & Cyan (White LED / AKKO Switch V3 / PBT Double-Shot)",
            image: "https://product.hstatic.net/1000037809/product/monsgeek_mg75_black___cyan_white_led_akko_cs_switch__chi_tiet_san_pham_9138c987339e4ded98b0f80b6e787173_master.jpg",
            price: 1099000,
            quantity: 100
      }
    }

    axios.post(`http://localhost:3001/api/review/create-review`, body)
      .then((res) => {
        console.log('Đăng đánh giá thành công')
        window.location.reload()
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


  return (
    <div style={{width: '95%', marginLeft: 'auto', marginRight: 'auto'}}>
         <div className='review' style={{marginTop:'2rem', marginBottom:'1rem', textAlign:'justify'}}>
              <h2 style={{textAlign:'center'}}> Đánh giá sản phẩm </h2>
              {latestData && latestData.length ? (
              <div>
                {latestData.map((child, index) => (
                  <Card className='listReview' style={{ padding: '10px', marginBottom: '5px' }} key={index}>
                    <div className='infoReview' style={{ display: 'flex', verticalAlign: 'middle', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto', verticalAlign: 'middle' }}>
                        <Avatar src={child.user.image} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                        <p style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>{child.user.name}</p>
                      </div>
                      <p>{formatDate(child.date)}</p>
                    </div>
                    <div>
                      <Rate defaultValue={child.rate} disabled />
                    </div>
                    <div>
                      {child.contentReview}
                    </div>
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
                    <p style={{ fontStyle: 'italic' }}>{'Chưa có đánh giá cho sản phẩm này'}</p>
                  </div>
              )}
         </div>
         <div>
            <h4 style={{textAlign: 'justify'}}>Viết đánh giá</h4>
            <div className='review-content-rating' style={{textAlign: 'justify'}}>
              1: Rất không hài lòng → 5: Rất hài lòng
              <Rate defaultValue={5} onChange={(value) => {setRating(value)}} />
            </div>
            <TextField variant='outlined' multiline rows={4} inputRef={textRef} label="Nội dung" type='text' className="insert-review-text" fullWidth />
            <Button type="primary" danger onClick={() => { handleCreateReview() }} style={{marginTop: '10px', }}>
              Đăng đánh giá
            </Button>
           
         </div>     
        
    </div>
  )
}
