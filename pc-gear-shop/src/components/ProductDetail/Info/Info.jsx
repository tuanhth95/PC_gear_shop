import React from 'react';
import { Flex, Row, Col } from 'antd';
import { ProductDetailBtn, ProductDetailImg, ProductDiscount, ProductName, ProductSale } from './style';
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
        if(!user?.id){
            navigate('/signin', {state: location?.pathname});
        }
        else{
            dispatch(addCartProduct(props.data));
        }
    }

    return (
        <Row justify="space-between">
            <Col span={8} className="product-detail-img">
                <ProductDetailImg src={props.data.img} alt={props.data.name} />
            </Col>
            <div style={{background: '#ECECEC', width: '1px'}}></div>
            <Col span={15} className="product-detail-general">
                <ProductName>
                    <h2>{props.data.name}</h2>
                </ProductName>
                <Flex gap="large">
                    <ProductSale className="pro-sale">{sale.toLocaleString()}</ProductSale>
                    <del className="pro-price" style={{margin: 'auto 0'}}>{price.toLocaleString()}</del>
                    {(discount !== 0) && <ProductDiscount className="pro-discount">-{discount}%</ProductDiscount>}
                </Flex>
                <div>
                <ProductDetailBtn type="submit" className="buy-now-btn" onClick={() => handleBuyNow()}>
                    MUA NGAY
                </ProductDetailBtn>
                </div>
                <div></div>
            </Col>
        </Row>
    )
}

export default Info;