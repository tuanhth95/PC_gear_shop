import React from 'react'
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Slide } from './style'

const SampleNextArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        color: '#fff',
        fontSize: '16px',
        lineHeight: '1.5715'
      }}
      onClick={onClick}
    >
      <RightOutlined />
    </div>
  )
}

const SamplePrevArrow = props => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        color: '#fff',
        fontSize: '16px',
        lineHeight: '1.5715'
      }}
      onClick={onClick}
    >
      <LeftOutlined />
    </div>
  )
}

const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  }
  
  const MainCarousel = (props) => {
    return (
        <Carousel arrows {...settings} autoplaySpeed='5000'>
          {
            props.data.map((slide, index) => {
              return (
                <div key={index}>
                  <Slide src={slide.img} alt={slide.name} />
                </div>
              )
            })
          }
          
            {/* <div>
              <Slide src="https://laptopxachtayshop.com/uploads/2024/01/xps.jpg" alt="" />
            </div>
            <div>
              <Slide src="https://laptopxachtayshop.com/uploads/2024/01/banner-flash-sale.jpg" alt="" />
            </div>
            <div>
              <Slide src="https://laptopxachtayshop.com/uploads/2024/04/y7000.jpg" alt="" />
            </div>
            <div>
              <Slide src="https://laptopxachtayshop.com/uploads/2024/03/helios.jpg" alt="" />
            </div> */}
        </Carousel>
    )
  }
  
  export default MainCarousel
