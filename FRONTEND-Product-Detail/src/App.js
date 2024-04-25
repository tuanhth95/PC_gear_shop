import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import { ProductDetailPart } from './style';
import ProductDetailInfo from './components/ProductDetailInfo';
import ProductDetailSpecifications from './components/ProductDetailSpecifications';
import ProductDetailOthers from './components/ProductDetailOthers';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function App() {
  
  const productId = 15

  const [generalInfo, setGeneralInfo] = useState()
  const [specifications, setSpecifications] = useState()
  const [otherProducts, setOthersProducts] = useState([])
  
  const fetchProductDetailAPI = async () => {
    const res = await axios.get(`http://localhost:3001/api/product_detail/${productId}`)
    // console.log(res.data)
    return res.data
  }
  
  
  const fetchOtherProductsAPI = async () => {
    const api1Result = await fetchProductDetailAPI();
    const response = await axios.get(`http://localhost:3001/api/product_detail/find_product_by_type/${api1Result.data.type}`)
    return response.data
  }
  
  const query = useQuery({ queryKey: ['todos'], queryFn: fetchProductDetailAPI })
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchOtherProductsAPI })

  useEffect(() => {
    if (query.data) {
      setGeneralInfo({
        id: query.data.data.id,
        name: query.data.data.name,
        type: query.data.data.type,
        price: query.data.data.price,
        discount: query.data.data.discount,
        img: query.data.data.img
      })
      setSpecifications(query.data.data.description)
    }
  }, [query.data])

  // useEffect(() => {
  //   if (query.data) {
  //     console.log(query.data)
  //   }
  // }, [query.data])

  return (
    <div className="product-detail">
      <Row>
        <ProductDetailPart span={24}>
          {generalInfo && <ProductDetailInfo data={generalInfo}/>}
        </ProductDetailPart>
      </Row>
      <p></p>
      <Row>
        <ProductDetailPart span={13}>
         {specifications && <ProductDetailSpecifications data={specifications}/>}
        </ProductDetailPart>
        <ProductDetailPart span={11}>
          <ProductDetailOthers />
        </ProductDetailPart>
      </Row>
    </div>
  );
}

export default App;
