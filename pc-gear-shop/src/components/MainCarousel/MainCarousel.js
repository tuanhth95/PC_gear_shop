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
        lineHeight: '1.5715',
        display: 'flex'
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
        lineHeight: '1.5715',
        display: 'flex'
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
        <Carousel arrows {...settings} autoplay>
          {
            props.data.map((slide, index) => {
              return (
                <div key={index}>
                  <Slide src={slide.img} alt={slide.name} />
                </div>
              )
            })
          }
        </Carousel>
    )
  }
  
  export default MainCarousel
