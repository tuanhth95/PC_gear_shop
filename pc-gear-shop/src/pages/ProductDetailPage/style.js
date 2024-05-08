import { Col } from 'antd';
import styled from 'styled-components';

export const ProductDetailPart = styled(Col)`
    background-color: white;
    border-radius: 5px;
    border: 1px solid #D9D9D9;
    margin: 10px 0;

`

export const ProductDetailContainer = styled.div`
    margin: 0 5%;
`

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: space-between;

    @media (max-width: 838px) {
        flex-direction: column; 
    }
`