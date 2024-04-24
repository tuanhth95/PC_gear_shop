import { Card } from "antd";
import { Button } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    },
    position: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#fff'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'}
`

export const WrapperCard = styled(Card)`
    padding: 8px 8px;
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
    font-weight: 400;
`

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0px;
`

export const WrapperPriceText = styled.p`
    color: red;
    font-weight: bold;
    font-size: 12px;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 14px;
    font-weight: 500;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`

export const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px; 
`;

export const DiscountTag = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: red;
  color: white;
  padding: 2px 6px;
  font-size: 12px;
  border-radius: 3px;
`;

export const ButtonShow = styled(Button)`
    display: block;      
    margin-left: auto;   
    margin-right: auto;
    margin-top: 10px;
`