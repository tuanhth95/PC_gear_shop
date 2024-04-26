import React, { useState, useEffect } from 'react';
import { Flex } from 'antd';
import { ProductDetailPart } from './style';
import Info from '../../components/ProductDetail/Info';
import Specifications from '../../components/ProductDetail/Specifications';
import Others from '../../components/ProductDetail/Others';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function ProductDetailPage() {
  
  const productId = 36

  const [generalInfo, setGeneralInfo] = useState()
  const [specifications, setSpecifications] = useState()
  const [otherProducts, setOthersProducts] = useState()
  
  const fetchProductDetailAPI = async () => {
    const res = await axios.get(`http://localhost:3001/api/product_detail/${productId}`)
      // console.log(res.data)
      return res.data
  }
  
  
  const fetchOtherProductsAPI = async () => {
    // const api1Result = await fetchProductDetailAPI();
    const response = await axios.get(`http://localhost:3001/api/product_detail/find_product_by_type/${productDetail.data.type}`)
    return response.data
  }
  
  const { data: productDetail, isLoading: isLoadingProductDetail, error: errorProductDetail } = useQuery({ queryKey: ['productDetail'],  queryFn: fetchProductDetailAPI });
  // console.log(productDetail);

  const { data: relativeProducts, isLoading: isLoadingRelativeProducts, error: errorRelativeProducts } = useQuery(
    { 
      queryKey: ['relativeProducts'], 
      queryFn: fetchOtherProductsAPI,
      enabled: !!productDetail
    });
  // console.log(relativeProducts);
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchProductDetailAPI })
  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchOtherProductsAPI })

  // useEffect(() => {
  //   if (query.data) {
  //     setGeneralInfo({
  //       id: query.data.data.id,
  //       name: query.data.data.name,
  //       type: query.data.data.type,
  //       price: query.data.data.price,
  //       discount: query.data.data.discount,
  //       img: query.data.data.img
  //     })
  //     setSpecifications(query.data.data.description)
  //   }
  // }, [query.data])

  useEffect(() => {
    if (productDetail) {
      // console.log(productDetail.data)
      setGeneralInfo({
        id: productDetail.data.id,
        name: productDetail.data.name,
        type: productDetail.data.type,
        price: productDetail.data.price,
        discount: productDetail.data.discount,
        img: productDetail.data.img
      })
      setSpecifications(productDetail.data.description)
    }
  }, [productDetail])

  useEffect(() => {
    if (relativeProducts) {
      console.log(relativeProducts.data);
      setOthersProducts(relativeProducts.data)
    }
  }, [relativeProducts])

  return (
    <div className="product-detail">
      <div>
        <ProductDetailPart>
          { generalInfo && <Info data={generalInfo}/> }
        </ProductDetailPart>
      </div>
      <Flex gap="middle" justify='space-between'>
        <div style={{width: '60%'}}>
          <ProductDetailPart>
          { specifications && <Specifications data={specifications}/> }
          </ProductDetailPart>
        </div>
        <div style={{width: '40%'}}>
          <ProductDetailPart>
            { otherProducts && <Others data={otherProducts} /> }
          </ProductDetailPart>
        </div>
      </Flex>
    </div>
  );
}

export default ProductDetailPage;
