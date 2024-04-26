import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, InputNumber, Slider, Col, Dropdown, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { setSearchPriceRange } from '../../redux/slides/productSlice';

const pricePresets = [
  { label: 'Dưới 1 triệu', value: [0, 1000000] },
  { label: '1 - 5 triệu', value: [1000000, 5000000] },
  { label: '5 - 10 triệu', value: [5000000, 10000000] },
  { label: '10 - 20 triệu', value: [10000000, 20000000] },
  { label: '20 - 30 triệu', value: [20000000, 30000000] },
  { label: 'Trên 30 triệu', value: [30000000, 100000000] },
];

const FilterPriceComponent = () => {

  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const [label, setLabel] = useState("Giá");

  useEffect(() => {
    if (priceRange[0] === 0 && priceRange[1] === 100000000) {
      setLabel("Giá");
    } else {
      setLabel(`${priceRange[0].toLocaleString()}đ - ${priceRange[1].toLocaleString()}đ`);
    }
  }, [priceRange]);

  const handlePresetSelect = (values) => {
      setPriceRange(values);
      dispatch(setSearchPriceRange(values));  
      setDropdownVisible(false);
  };

  const handleSearch = () => {
    dispatch(setSearchPriceRange(priceRange));
    setDropdownVisible(false);
  };

  const handleReset = () => {
    setPriceRange([0,100000000]); 
    dispatch(setSearchPriceRange([0,100000000])); 
    setDropdownVisible(false);
  };

  const menu = (
    <div style={{ padding: '10px', width: 'fit-content', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 10px rgba(0, 0, 0, .5)'}}>
      <Row wrap={false} gutter={[8, 8]}>
        {pricePresets.map((preset) => (
          <Col key={preset.label}>
            <Button onClick={() => handlePresetSelect(preset.value)}>
              {preset.label}
            </Button>
          </Col>
        ))}
      </Row>
        <div>
          <InputNumber
            min={0}
            step={500000}
            max={100000000}
            value={priceRange[0]}
            onChange={(value) => setPriceRange([value, priceRange[1]])}
            formatter={(value) => `${value.toLocaleString()}đ`}
            style={{ width: '45%', marginRight: '10%', marginTop: '10px' }}
          />
          <InputNumber
            min={0}
            max={150000000}
            value={priceRange[1]}
            onChange={(value) => setPriceRange([priceRange[0], value])}
            formatter={(value) => `${value.toLocaleString()}đ`}
            style={{ width: '45%' }}
          />
          <Slider
            range
            step={500000}
            min={0}
            max={100000000}
            onChange={setPriceRange}
            value={priceRange}
            style={{ marginTop: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button onClick={handleReset}>Bỏ chọn</Button>
          <Button type="primary" onClick={handleSearch}>
            Xem kết quả
          </Button>
        </div>
      </div>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      visible={dropdownVisible}
      onVisibleChange={(flag) => setDropdownVisible(flag)}
    >
      <Button style={{ width: 'fit-content', textAlign: 'left', fontSize: '16px' }}>
        {label} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default FilterPriceComponent;
