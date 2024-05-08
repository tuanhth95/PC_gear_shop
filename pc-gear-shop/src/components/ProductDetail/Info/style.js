import styled from 'styled-components';

export const ProductDetailImg = styled.img`
    width: 100%;
    height: auto;
`

export const ProductSale = styled.span`
    font-weight: bold;
    color: #1A93FF;
    font-size: 1.5rem;

    @media (min-width: 375) {
        font-size: 16px;
    }
    @media (min-width: 460px) {
        font-size: 24px;
    }
    @media (min-width: 768px) {
        font-size: 20px;
    }
    @media (min-width: 1024px) {
        font-size: 24px;
    }
`

export const ProductDiscount = styled.span`
    color: #1A93FF;
    border: 1px solid #1A93FF;
    border-radius: 3px;
    margin: auto 0;
    line-height: 20px;
    padding: 3px;
`

export const ProductDetailBtn = styled.button`
    color: white;
    background-color: #1A93FF;
    width: 50%;
    height: 50px;
    border: none;
    font-size: 1.2rem;
    border-radius: 5px;
    padding: 5px;
    margin-top: 1.2rem;
    font-weight: bold;

    @media (max-width: 768px) {
        width: 100%;
    }
    @media (min-width: 768px) {
        width: 70%;
    }
    @media (min-width: 1024px) {
        width: 50%;
    }
`
export const ProductName = styled.h2`
    margin: 1rem 0;

    @media (max-width: 375) {
        font-size: 16px;
    }
    @media (max-width: 768px) {
        font-size: 18px;
    }
    @media (max-width: 1024px) {
        font-size: 20px;
    }
`
export const Note = styled.span`
    color: black;
    font-size: 18px;
`