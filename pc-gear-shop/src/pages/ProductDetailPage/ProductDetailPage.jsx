import React, { useState, useEffect } from "react";
import { FlexContainer, ProductDetailContainer, ProductDetailPart } from "./style";
import Info from "../../components/ProductDetail/Info/Info";
import Specifications from "../../components/ProductDetail/Specifications/Specifications";
import Others from "../../components/ProductDetail/Others/Others";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Review from "../../components/Review";

function ProductDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const [generalInfo, setGeneralInfo] = useState();
  const [specifications, setSpecifications] = useState();
  const [otherProducts, setOthersProducts] = useState();
  const [needReload, setNeedReload] = useState(false);

  const fetchProductDetailAPI = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/product_detail/find_product_by_type/${productId}`
    );
    // console.log(res.data);
    return res.data;
  };

  const fetchOtherProductsAPI = async () => {
    // const api1Result = await fetchProductDetailAPI();
    const response = await axios.get(
      `http://localhost:3001/api/product_detail/find_product_by_type_type/${productDetail.data.type.replace(
        " ",
        "-"
      )}`
    );
    return response.data;
  };

  const handleOther = (id) => {
    navigate(`/ProductDetail/${id}`);
    window.location.reload();
  };
  useEffect(() => {
    // console.log("need reload: ",needReload);
    if(needReload){
      setNeedReload(false)
    }
  },[needReload])

  const {
    data: productDetail,
    isLoading: isLoadingProductDetail,
    error: errorProductDetail,
  } = useQuery({ queryKey: ["productDetail"], queryFn: fetchProductDetailAPI });
  // console.log(productDetail);

  const {
    data: relativeProducts,
    isLoading: isLoadingRelativeProducts,
    error: errorRelativeProducts,
  } = useQuery({
    queryKey: ["relativeProducts"],
    queryFn: fetchOtherProductsAPI,
    enabled: !!productDetail,
  });

  useEffect(() => {
    if (productDetail) {
      // console.log("detail: ",productDetail.data);
      setGeneralInfo({
        id: productDetail.data.id,
        name: productDetail.data.name,
        type: productDetail.data.type,
        price: productDetail.data.price,
        discount: productDetail.data.discount,
        img: productDetail.data.img,
        countInStock: productDetail.data.countInStock
      });
      setSpecifications(productDetail.data.description);
    }
  }, [productDetail]);

  useEffect(() => {
    if (relativeProducts) {
      // console.log("relative: ",relativeProducts.data);
      setOthersProducts(relativeProducts.data.filter(relativeProduct => relativeProduct.id !== productDetail.data.id));
    }
  }, [relativeProducts]);

  return (
    <ProductDetailContainer className="product-detail">
      <div>
        <ProductDetailPart>
          {generalInfo && <Info data={generalInfo} />}
        </ProductDetailPart>
      </div>
      <FlexContainer>
        <div style={{flex: '4'}}>
          <ProductDetailPart>
            {specifications && <Specifications data={specifications} />}
          </ProductDetailPart>
        </div>
        <div style={{flex: '3'}}>
          <ProductDetailPart>
            {otherProducts && (
              <Others data={otherProducts} handleOther={handleOther} />
            )}
          </ProductDetailPart>
        </div>
      </FlexContainer>
      <Review productId = {productDetail?.data?.id}></Review>
    </ProductDetailContainer>
  );
}

export default ProductDetailPage;
