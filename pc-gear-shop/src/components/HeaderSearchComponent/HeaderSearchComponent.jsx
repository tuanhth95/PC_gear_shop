import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Col } from 'antd';
import { searchProduct as searchProductAction } from '../../redux/slices/productSlice'; // Correct the path if necessary
import { WrapperHeader } from './style';

const HeaderSearchComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const onSearch = (value) => {
        if (!value.trim()) return; 
        dispatch(searchProductAction(value));
        navigate(`/search?query=${encodeURIComponent(value)}`); 
    };

    return (
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
    );
};

export default HeaderSearchComponent;