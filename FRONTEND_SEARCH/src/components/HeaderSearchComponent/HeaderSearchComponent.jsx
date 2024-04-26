import { Input, Col } from 'antd';
import React, { useState } from 'react';
import { WrapperHeader } from './style';
import { useDispatch } from 'react-redux';
import { searchProduct as searchProductAction } from '../../redux/slides/productSlice'; // Rename the imported action

import { useSelector } from "react-redux";
import CardComponent from "../../components/CardComponent/CardComponent";
import FilterPriceComponent from "../../components/FilterPriceComponent/FilterPriceComponent";
import { WrapperButtonMore, WrapperProducts } from "./style";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService';

const HeaderSearchComponent = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const onSearch = (value) => {
        dispatch(searchProductAction(value)); // Use the renamed action
    };

    const currentSearchTerm = useSelector(state => state.product.search); // Use a different variable name for the selector
    const searchPrice = useSelector(state => state.product.searchPriceRange);
    const [limit, setLimit] = useState(10);

    const { isLoading, data: products, error } = useQuery({
        queryKey: ['products', currentSearchTerm, searchPrice, limit],
        queryFn: () => ProductService.getAllProduct(currentSearchTerm, searchPrice, limit),
        retry: 3,
        retryDelay: 1000
    });

    const renderSearchResultCount = () => {
        if (currentSearchTerm === "") {
            return null;
        }
        if (products?.data?.length > 0) {
            return (
                <div style={{ margin: '20px 0', fontSize: '1.75rem', color: '#161617', paddingLeft: '20px' }}>
                    Kết quả tìm kiếm cho <strong>"{currentSearchTerm}":</strong> {products.data.length} sản phẩm
                </div>
            );
        } else if (products?.data?.length === 0) {
            return <div style={{ margin: '20px 0', fontSize: '1.75rem', paddingLeft: '20px' }}>Không tìm thấy sản phẩm.</div>;
        }
        return null;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching products: {error.message}</div>;
    }

    return (
        <div>
            <WrapperHeader>
                <Col span={6}></Col>
                <Col span={12}>
                    <Input.Search
                        placeholder="Bạn cần tìm gì?"
                        value={search}
                        onChange={onChange}
                        onSearch={onSearch}
                        enterButton
                    />
                </Col>
                <Col span={6}></Col>
            </WrapperHeader>
            {currentSearchTerm && (
                <div id="container" style={{background: '#fff', padding: '0 120px', height: 'fit-content', width: 'fit-content', margin: 'auto auto'}}>
                    <div style={{paddingTop: '24px', marginLeft: '20px'}}>
                        <FilterPriceComponent />
                    </div>
                    {renderSearchResultCount()}
                    <WrapperProducts>
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
                            onClick={() => setLimit(prev => prev + 10)}
                            styleButton={{border: '1px solid rgb(11,116,229)', color: 'rgb(11,116,229)', width: '120px', height: '38px', borderRadius: '4px'}}
                            styleTextButton={{fontWeight: '500'}}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderSearchComponent;