import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, InputNumber, Slider, Dropdown, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSearchPriceRange } from '../../redux/slices/productSlice';

const pricePresets = [
    { label: 'Dưới 1 triệu', value: [0, 1000000] },
    { label: '1 - 5 triệu', value: [1000000, 5000000] },
    { label: '5 - 10 triệu', value: [5000000, 10000000] },
    { label: '10 - 20 triệu', value: [10000000, 20000000] },
    { label: '20 - 30 triệu', value: [20000000, 30000000] },
    { label: 'Trên 30 triệu', value: [30000000, 1000000000] },
];

const FilterPriceComponent = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [tempPriceRange, setTempPriceRange] = useState([0, 1000000000]);  
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const applyFilters = () => {
        const params = new URLSearchParams(location.search);
        params.set('minPrice', tempPriceRange[0]);
        params.set('maxPrice', tempPriceRange[1]);
        navigate(`?${params.toString()}`, { replace: true });
        dispatch(setSearchPriceRange(tempPriceRange));
        setDropdownVisible(false);
    };

    const handlePresetSelect = (preset) => {
        setTempPriceRange(preset.value);
    };

    const resetFilters = () => {
        setTempPriceRange([0, 1000000000]);
        navigate('?', { replace: true });
        dispatch(setSearchPriceRange([0, 1000000000]));
    };

    return (
        <Dropdown overlay={menu(tempPriceRange, setTempPriceRange, handlePresetSelect, resetFilters, applyFilters)} 
                  trigger={['click']} 
                  visible={dropdownVisible} 
                  onVisibleChange={setDropdownVisible}>
            <Button>Giá <DownOutlined /></Button>
        </Dropdown>
    );
};

const menu = (tempPriceRange, setTempPriceRange, handlePresetSelect, resetFilters, applyFilters) => (
    <div style={{ padding: '10px', width: 'fit-content', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 10px rgba(0, 0, 0, .5)'}}>
        <Row wrap={false} gutter={[8, 8]}>
            {pricePresets.map(preset => (
                <Col key={preset.label}>
                    <Button onClick={() => handlePresetSelect(preset)}>
                        {preset.label}
                    </Button>
                </Col>
            ))}
        </Row>
        <Row justify="space-between" style={{ marginTop: '10px' }}>
            <Col span={11}>
                <InputNumber
                    min={0}
                    value={tempPriceRange[0]}
                    onChange={value => setTempPriceRange([value, tempPriceRange[1]])}
                    style={{ width: '100%' }}
                />
            </Col>
            <Col span={11}>
                <InputNumber
                    min={0}
                    value={tempPriceRange[1]}
                    onChange={value => setTempPriceRange([tempPriceRange[0], value])}
                    style={{ width: '100%' }}
                />
            </Col>
        </Row>
        <Slider
            range
            step={500000}
            min={0}
            max={1000000000}
            onChange={setTempPriceRange}
            value={tempPriceRange}
            style={{ marginTop: '10px' }}
        />
        <Row justify="space-between" style={{ marginTop: '10px' }}>
            <Button onClick={resetFilters}>Bỏ chọn</Button>
            <Button type="primary" onClick={applyFilters}>Xem kết quả</Button>
        </Row>
    </div>
);

export default FilterPriceComponent;
