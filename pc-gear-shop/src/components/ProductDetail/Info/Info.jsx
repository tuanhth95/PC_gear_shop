import React, { useState, useEffect } from 'react';
import { Flex, Row, Col, InputNumber, Divider } from 'antd';
import { ProductDetailBtn, ProductDetailImg, ProductDiscount, ProductName, ProductSale, Note } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { addCartProduct } from '../../../redux/slices/cartSlide';

const Info = (props) => {
    const location = useLocation()
    const price = props.data.price
    const discount = props.data.discount
    const sale = price * (1 - (discount/100))
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBuyNow = () => {
        console.log('user id: ', user?.id)
        props.data.amount = quantity
        dispatch(addCartProduct(props.data));
    }

    const [quantity, setQuantity] = useState(1)

    return (
        <Row justify="space-between">
            <Col xs={24} sm={24} md={12} lg={8} className="product-detail-img" style={{borderRight: '1px solid #D9D9D9'}}>
                <ProductDetailImg src={props.data.img} alt={props.data.name} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={16} className="product-detail-general">
                <div style={{margin: '0 24px'}}>
                    <ProductName>
                        {props.data.name}
                    </ProductName>
                    <Flex gap="large" style={{margin: '1% 0'}}>
                        <ProductSale className="pro-sale">{sale.toLocaleString()} đ</ProductSale>
                        <del className="pro-price" style={{margin: 'auto 0'}}>{price.toLocaleString()} đ</del>
                        {(discount !== 0) && <ProductDiscount className="pro-discount">-{discount}%</ProductDiscount>}
                    </Flex>
                    <div>
                    <p>Kho: {props.data.countInStock}</p>
                    <InputNumber
                        addonBefore={<label>Số lượng:</label>}
                        min={1}
                        max={props.data.countInStock} 
                        value={quantity}
                        onChange={setQuantity}
                    />
                    </div>
                    <ProductDetailBtn type="submit" className="buy-now-btn" onClick={() => handleBuyNow()}>
                        THÊM GIỎ HÀNG
                    </ProductDetailBtn>
                    <Divider />
                    <Flex vertical='true' gap='middle'>
                        <Note><span style={{color: '#1A93FF'}}> ✔ </span>Bảo hành chính hãng 24 tháng</Note>
                        <Note><span style={{color: '#1A93FF'}}> ✔ </span>Hỗ trợ đổi mới trong 7 ngày</Note>
                        <Note><span style={{color: '#1A93FF'}}> ✔ </span>Windows bản quyền tích hợp</Note>
                        <Note><span style={{color: '#1A93FF'}}> ✔ </span>Miễn phí giao hàng toàn quốc</Note>
                    </Flex>
                </div>
                <div></div>
            </Col>
        </Row>
    )
}

export default Info;