import React, { useEffect, useState } from 'react'
import { Flex } from 'antd'
import { OtherProductDiscount, OtherProductImg, OtherProductPrice, OtherProductSale } from './style';
import { useNavigate } from 'react-router-dom';

const Others = (props) => {
    console.log("props in Others: ", props);
    const firstThreeElements = props.data.slice(0, 3);
    const handleOther = props.handleOther;
    return (
        <>
            <h2>Sản phẩm tương tự</h2>
            <Flex vertical='true' className='relative-products'>
            {
                firstThreeElements.map((item, index) => {
                    return (
                        <Flex key={index} gap='small'>
                            <OtherProductImg src={item.img} alt={item.name} onClick={() => handleOther(item.id)}/>
                            <div>
                                <h3 onClick={() => handleOther(item.id)} >{item.name}</h3>
                                <OtherProductPrice gap='large'>
                                    <OtherProductSale className="pro-sale">{item.price.toLocaleString()}</OtherProductSale>
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