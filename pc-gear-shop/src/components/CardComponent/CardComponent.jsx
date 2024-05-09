import React from 'react';
import {Button } from 'antd';
import { WrapperCard, DiscountTag, ButtonShow} from './style';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';
import { useDispatch } from 'react-redux';
import { addCartProduct } from "../../redux/slices/cartSlide"
import {
  ShoppingCartOutlined,
} from "@ant-design/icons";

const CardComponent = ({ countInStock, description, img, name, price, discount, type, id }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const discountPrice = discount ? price - discount/100 * price : price;
  const formattedPrice = discountPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  const originalPrice = discount !== 0 ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : null;
  const discountPercentage = discount ? `-${discount}%` : null;
  const handleViewProduct = () => {
    navigate(`/ProductDetail/${id}`);
  }

  const handleAddToCart = () => {
    //console.log("user id: ", user?.id);
    let amount=1;
    dispatch(addCartProduct({img,name,price,discount,type,id,amount}));
  }

  return (
    <WrapperCard hoverable style={{ borderRadius: '4px', overflow: 'hidden' }}>
      <img
        alt={name}
        src={img}
        style={{ width: '100%', objectFit: 'cover', height: '200px' }}
      />
      <div>
        <h3 style={{ marginTop: '12px', marginBottom:'4px', fontWeight: '600', fontSize: '14px', height: '68px'}}>{name}</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontWeight: '600', color: 'red', margin: '4px 0', marginRight: '10px', fontSize: '14px' }}>
            {convertPrice(formattedPrice)}
          </p>
          {discountPercentage && <DiscountTag>{discountPercentage}</DiscountTag>}
          {originalPrice && (
            <p style={{ textDecoration: 'line-through', color: '#a9a9a9', margin: '4px 12px', fontSize: '12px' }}>
              {convertPrice(originalPrice) }
            </p>
          )}
        </div>
        {/* <div style={{ color: countInStock > 0 ? 'green' : 'red' , fontSize: '14px'}}>
          {countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
        </div> */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ButtonShow type="primary"
            onClick={() => handleViewProduct()}>Xem sản phẩm</ButtonShow> 
            <ShoppingCartOutlined 
            style={{ marginTop: '8px', fontSize: '24px', color: 'rgb(26, 147, 255)' }}
            hover={{
              color: 'rgb(22, 119, 255)'
            }}
             onClick={() => handleAddToCart()}></ShoppingCartOutlined>
        </div>
      </div>
    </WrapperCard>
  );
};
  
export default CardComponent;
