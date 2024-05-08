import { Flex } from 'antd';
import styled from 'styled-components';

export const OtherProductImg = styled.img`
    width: 36%;
    padding: 5px;
`

export const OtherProductSale = styled.span`
    font-weight: bold;
    color: #1A93FF;
    font-size: 18px;

    @media (max-width: 839px) {
        font-size: 18px;
    }
    @media (max-width: 1024px) {
        font-size: 16px;
    }
`

export const OtherProductDiscount = styled.span`
    color: #1A93FF;
    border: 1px solid #1A93FF;
    border-radius: 3px;
    margin: auto 0;
    line-height: 20px;
    padding: 3px;
`

export const OtherProductPrice = styled(Flex)`
    margin: 16px 0;
`