import React from 'react'
import { Flex } from 'antd'
import { OtherProductDiscount, OtherProductImg, OtherProductPrice, OtherProductSale } from './style';
import { useNavigate } from 'react-router-dom';

const Others = (props) => {
    // console.log("props in Others: ", props);
    const firstFourElements = props.data.slice(0, 4);
    const handleOther = props.handleOther;
    return (
        <>
            <h2>Sản phẩm tương tự</h2>
            <Flex vertical='true' className='relative-products'>
            {
                firstFourElements.map((item, index) => {
                    return (
                        <Flex key={index} gap='small'>
                            <OtherProductImg src={item.img} alt={item.name} onClick={() => handleOther(item.id)}/>
                            <div style={{margin: '10px'}}>
                                <h6 onClick={() => handleOther(item.id)} >{item.name}</h6>
                                <OtherProductPrice gap='large'>
                                    <OtherProductSale className="pro-sale">{item.price.toLocaleString()} đ</OtherProductSale>
                                    {(item.discount !== 0) && <OtherProductDiscount className="pro-discount">-{item.discount}%</OtherProductDiscount>}
                                </OtherProductPrice>
                                
                            </div>
                            
                        </Flex>
                    )
                })
            }
            </Flex>
        </>
    )
}

export default Others;