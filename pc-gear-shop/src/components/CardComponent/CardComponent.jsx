import React from 'react';
import {Button } from 'antd';
import { WrapperCard, DiscountTag, ButtonShow } from './style';

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
        style={{ width: '100%', objectFit: 'cover', height: 'auto' }}
      />
      <div>
        <h3 style={{ margin: '12px 0', fontWeight: '600' }}>{name}</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ fontWeight: '600', color: 'red', margin: '4px 0', marginRight: '10px', fontSize: '16px' }}>
            {formattedPrice}
          </p>
          {discountPercentage && <DiscountTag>{discountPercentage}</DiscountTag>}
          {originalPrice && (
            <p style={{ textDecoration: 'line-through', color: '#a9a9a9', margin: '4px 12px', fontSize: '14px' }}>
              {originalPrice}
            </p>
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
