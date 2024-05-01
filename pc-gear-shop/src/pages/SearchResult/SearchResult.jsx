import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct as searchProductAction } from '../../redux/slides/productSlice';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../../../FRONTEND_SEARCH/src/services/ProductService';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperProducts, WrapperButtonMore } from './style';
import FilterPriceComponent from '../../components/FilterPriceComponent/FilterPriceComponent';

const SearchResult = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query'); 
    const searchProduct = useSelector(state => state?.product?.search);
    const searchPrice = useSelector(state => state.product.searchPriceRange);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        dispatch(searchProductAction(query)); 
    }, [query, dispatch]);

    const { isLoading, data: products, error } = useQuery({
        queryKey: ['products', searchProduct, searchPrice, limit],
        queryFn: () => ProductService.getAllProduct(searchProduct, searchPrice, limit),
        retry: 3,
        retryDelay: 1000
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products: {error.message}</div>;

    const renderSearchResultCount = () => {
        if (searchProduct === "") {
            return null;
        }
        if (products?.data?.length > 0) {
            return (
                <div style={{ margin: '20px 0', fontSize: '1.75rem', color: '#161617', marginLeft: '20px' }}>
                    Kết quả tìm kiếm cho <strong>"{searchProduct}":</strong>
                </div>
            );
        } else if (products?.data?.length === 0) {
            return <div style={{ margin: '20px 0', fontSize: '1.75rem', marginLeft: '20px' }}>Không tìm thấy sản phẩm.</div>;
        }
        return null;
    };

    return (
        <div>
        <div id="container" style={{background: '#fff', padding: '0 120px', height: 'fit-content', width: 'fit-content', margin: 'auto auto'}}>
                 <div style={{paddingTop: '24px', marginLeft: '20px'}}>
                     {products?.data?.length > 0 && <FilterPriceComponent />}
                    </div>
                {renderSearchResultCount()}
                <WrapperProducts>
                    {products?.data?.map(product => (
                        <CardComponent key={product.id} {...product} />
                    ))}
                </WrapperProducts>
                {products?.data?.length >= 10 && ( 
                    <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px'}}>
                        <WrapperButtonMore
                            textButton="Xem thêm"
                            type="outline"
                            onClick={()=> setLimit(prev =>prev + 10)}
                            styleButton={{border: '1px solid rgb(11,116,229)', width: '120px', height: '38px', borderRadius: '4px'}}
                            styleTextButton={{fontWeight: '500', color: 'rgb(11,116,229)'}}
                        />
                    </div>
                )}
        </div>
        </div>
    );
};

export default SearchResult;
