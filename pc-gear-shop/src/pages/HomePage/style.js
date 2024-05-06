import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover{
        color: #fff;
        background: rgb(13,92,182);
        span{
            color: #fff;
        }
    }
    color: rgb(11, 116, 229);
    width: 100%;
`

export const WrapperProducts = styled.div`
  display: grid;
  gap: 8px;
  //padding: 20px;
  margin-top: 1%;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media (min-width: 1280px)
  {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @media (max-width: 1280px)
  {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 1024px)
  {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 968px)
  {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  // @media (max-width: 480px)
  // {
  //   grid-template-columns: repeat(1, minmax(0, 1fr));
  // }

`;

export const GroupedProducts = styled.div`
    background-color: #fff;
    border-radius: 3px 3px 0 0;
`

export const GroupedProductsTitle = styled.h2`
    padding: 1% 1%;
`

