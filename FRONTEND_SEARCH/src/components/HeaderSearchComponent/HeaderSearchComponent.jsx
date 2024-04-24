import { Input, Col } from 'antd';
import React, { useState } from 'react';
import { WapperHeader } from './style';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../../redux/slides/productSlice';

const HeaderSearchComponent = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const onSearch = (value) => {
        dispatch(searchProduct(value));
    };

    return (
        <div>
            <WapperHeader>
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
            </WapperHeader>
        </div>
    )
}

export default HeaderSearchComponent;
