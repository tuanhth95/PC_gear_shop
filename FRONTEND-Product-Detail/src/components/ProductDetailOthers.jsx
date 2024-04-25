import React from 'react'
import { Flex } from 'antd'

const ProductDetailOthers = (props) => {

    const firstThreeElements = props.data.slice(0, 3);

    return (
        <>
            <h2>Sản phẩm tương tự</h2>
            <Flex vertical='true' className='relative-products'>
            {
                firstThreeElements.map((item, index) => {
                    return (
                        <Flex key={index} gap='small'>
                            <img src={item.img} alt={item.name} />
                            <div>
                                <h4>{item.name}</h4>
                                <Flex gap='large'>
                                    <span style={{fontSize: '1rem'}} className="pro-sale">{item.price.toLocaleString()}</span>
                                    {(item.discount !== 0) && <span className="pro-discount">-{item.discount}%</span>}
                                </Flex>
                                
                            </div>
                            
                        </Flex>
                    )
                })
            }
            </Flex>
        </>
    )
}

export default ProductDetailOthers;