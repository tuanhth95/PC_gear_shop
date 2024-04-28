import { Flex } from 'antd';
import styled from 'styled-components';

export const OtherProductImg = styled.img`
    width: 36%;
    padding: 5px;
`

export const OtherProductSale = styled.span`
    font-weight: bold;
    color: #1A93FF;
    font-size: 20px;
`

export const OtherProductDiscount = styled.span`
    color: #1A93FF;
    border: 1px solid #1A93FF;
    border-radius: 3px;
    margin: auto 0;
    line-height: 20px;
`

export const OtherProductPrice = styled(Flex)`
    margin: 16px 0;
`