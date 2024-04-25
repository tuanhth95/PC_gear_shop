import React from 'react';
import { Flex, Row, Col } from 'antd';

const ProductDetailInfo = (props) => {

    const price = props.data.price
    const discount = props.data.discount
    const sale = price * (1 - (discount/100))

    return (
        <Row justify="space-between">
            <Col span={8} className="product-detail-img">
                <img src={props.data.img} alt={props.data.name} />
            </Col>
            <div style={{background: '#ECECEC', width: '1px'}}></div>
            <Col span={15} className="product-detail-general">
                <div>
                    <h2>{props.data.name}</h2>
                </div>
                <Flex gap="large">
                    <span className="pro-sale">{sale.toLocaleString()}</span>
                    <del style={{margin: 'auto 0'}}>{price.toLocaleString()}</del>
                    {(discount !== 0) && <span className="pro-discount">-{discount}%</span>}
                </Flex>
                <div>
                <button type="submit" className="buy-now-btn">
                    MUA NGAY
                </button>
                </div>
                <div></div>
            </Col>
        </Row>
    )
}

export default ProductDetailInfo;