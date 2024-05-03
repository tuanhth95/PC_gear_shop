import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const sorts = [
    { id: 1, value: '-createdAt', text: 'Sản phẩm mới nhất' },
    { id: 2, value: 'createdAt', text: 'Sản phẩm cũ nhất' },
    { id: 3, value: '-discount', text: '% Giảm' },
    { id: 4, value: 'price', text: 'Giá từ thấp đến cao' },
    { id: 5, value: '-price', text: 'Giá từ cao đến thấp' },
    { id: 6, value: 'name', text: 'Từ A - Z' },
    { id: 7, value: '-name', text: 'Từ Z - A' },
];

const SortComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const initialSort = searchParams.get('sort') || 'Xếp theo';
    const [sort, setSort] = useState(initialSort);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (sort !== 'Xếp theo') {
            params.set('sort', sort);
        } else {
            params.delete('sort');
        }
        navigate(`?${params.toString()}`, { replace: true });
    }, [sort, navigate, location.search]);
    
    return (
    <Select
        value={sort}
        style={{ width: 175 }}
        onChange={setSort}
        placeholder="Xếp theo"
    >
        {sorts.map(option => (
            <Select.Option key={option.id} value={option.value}>
                {option.text}
            </Select.Option>
        ))}
    </Select>
    );
};

export default SortComponent;