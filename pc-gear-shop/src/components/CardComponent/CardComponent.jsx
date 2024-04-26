import React from 'react';
//import {Button } from 'antd';
import { WrapperCard, DiscountTag, ButtonShow, StyleNameProduct, StylePrice, StylePriceDiscount } from './style';

const CardComponent = ({ countInStock, description, img, name, price, discount, type, id }) => {
  const discountPrice = discount ? price - discount/100 * price : price;
  const formattedPrice = discountPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  const originalPrice = discount !== 0 ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : null;
  const discountPercentage = discount ? `-${discount}%` : null;

  return (
    <WrapperCard hoverable style={{ borderRadius: '4px', overflow: 'hidden' }}>
      <img
        alt={name}
        src={img}
        style={{ width: '100%', objectFit: 'cover', height: '50%' }}
      />
      <div>
      <StyleNameProduct>{name}</StyleNameProduct>
        <div style={{ display: 'flex', flexDirection: 'row',  alignItems: 'center' }}>
          <StylePriceDiscount>
            {formattedPrice}
          </StylePriceDiscount>
          {discountPercentage && <DiscountTag>{discountPercentage}</DiscountTag>}
          {originalPrice && (
            <StylePrice>
              {originalPrice}
            </StylePrice>
          )}
        </div>
        {/* <div style={{ color: countInStock > 0 ? 'green' : 'red' , fontSize: '14px'}}>
          {countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
        </div> */}
        <ButtonShow type="primary" danger>Xem sản phẩm</ButtonShow>
      </div>
    </WrapperCard>
  );
};
  
export default CardComponent;
