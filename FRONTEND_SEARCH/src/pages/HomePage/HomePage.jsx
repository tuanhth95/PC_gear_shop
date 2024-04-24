import { useSelector } from "react-redux";
import CardComponent from "../../components/CardComponent/CardComponent";
import FilterPriceComponent from "../../components/FilterPriceComponent/FilterPriceComponent";
import { WrapperButtonMore, WrapperProducts } from "./style";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'

const HomePage = () => {
    const searchProduct = useSelector(state => state?.product?.search);
    const searchPrice = useSelector(state => state?.product?.searchPriceRange);
    const [limit, setLimit] = useState(10);

    const { isLoading, data: products, error } = useQuery({
        queryKey: ['products', searchProduct, searchPrice, limit],
        queryFn: () => ProductService.getAllProduct(searchProduct, searchPrice, limit),
        retry: 3,
        retryDelay: 1000
    });

    const renderSearchResultCount = () => {
        if(searchProduct === "")
        {
            return null
        }
        if (products?.data?.length > 0) {
            return (
                <div style={{ margin: '20px 0', fontSize: '1.75rem' , color: '#161617', paddingLeft: '20px'}}>
                    Kết quả tìm kiếm cho <strong>"{searchProduct}":</strong> {products.data.length} sản phẩm
                </div>
            );
        } else if (products?.data?.length === 0) {
            return <div style={{ margin: '20px 0', fontSize: '1.75rem', paddingLeft: '20px' }}>Không tìm thấy sản phẩm.</div>;
        }
        return null;
    };

    if (isLoading) {
        return <div>
        </div>;
    }

    if (error) {
        return <div>Error fetching products: {error.message}</div>;
    }

    return(
        <div id="container" style={{background: '#fff', padding: '0 120px', height: 'fit-content', width: 'fit-content', margin: 'auto auto'}}>
            <div style={{paddingTop: '24px', marginLeft: '20px'}}>
                <FilterPriceComponent />
            </div>
            {renderSearchResultCount()} 
            <WrapperProducts >
                {products?.data?.map(product => (
                    <CardComponent
                        key={product._id}
                        description={product.description}
                        img={product.img}
                        name={product.name}
                        price={product.price}
                        discount={product.discount}
                        type={product.type}
                        id={product._id}
                    />
                ))}
            </WrapperProducts>
            <div style={{width: '100%', display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center'}}>
            <WrapperButtonMore
                textButton="Xem thêm"
                type="outline"
                onClick={()=> setLimit((prev) =>prev + 10)}
                styleButton={{border: '1px solid rgb(11,116,229)', color: 'rgb(11,116,229)', width: '120px', height: '38px', borderRadius: '4px'}}
            styleTextButton={{fontWeight: '500'}}
            />
        </div>

        </div>
    )
}

export default HomePage;
