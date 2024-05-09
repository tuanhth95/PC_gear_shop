import React from 'react'
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import CardComponent from '../CardComponent/CardComponent'

const SampleNextArrow = props => {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'grey',
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
          color: 'grey',
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
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1280,  
      settings: {
          slidesToShow: 4 
      }
  },
      {
          breakpoint: 1024,  
          settings: {
              slidesToShow: 3  
          }
      },
      {
          breakpoint: 600,   
          settings: {
              slidesToShow: 2  
          }
      },
      {
          breakpoint: 480,   
          settings: {
              slidesToShow: 1  
          }
      }
  ]
}

const ProductsSlider = (props) => {
  return (
      <Carousel arrows {...settings} slidesToShow={5}>
        {
            props.data.map((product, index) => {
                return (
                    <CardComponent
                        key={index}
                        description={product.description}
                        img={product.img}
                        name={product.name}
                        price={product.price}
                        discount={product.discount}
                        type={product.type}
                        id={product.id}
                    />
                )
            })
        }
        </Carousel>
    )
}

export default ProductsSlider