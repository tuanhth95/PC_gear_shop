import React from 'react'
import { Flex } from 'antd'
import { OtherProductDiscount, OtherProductImg, OtherProductPrice, OtherProductSale } from './style';

const Others = (props) => {

    const firstThreeElements = props.data.slice(0, 3);

    return (
        <>
            <h2>Sản phẩm tương tự</h2>
            <Flex vertical='true' className='relative-products'>
            {
                firstThreeElements.map((item, index) => {
                    return (
                        <Flex key={index} gap='small'>
                            <OtherProductImg src={item.img} alt={item.name} />
                            <div>
                                <h3>{item.name}</h3>
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