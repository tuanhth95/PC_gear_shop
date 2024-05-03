// FilterProducerComponent.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedProducer } from '../../redux/slices/productSlice';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const producers = ["DELL", "ASUS", "HP", "LENOVO", "ACER", "MSI", "APPLE", "E-Dra", "AKKO", "Logitech"]; 

const FilterProducerComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProducer = useSelector((state) => state.product.selectedProducer);

  const handleSelectProducer = (producer) => {
    const newProducer = producer.toLowerCase() === selectedProducer.toLowerCase() ? '' : producer;
    dispatch(setSelectedProducer(newProducer));

    const searchParams = new URLSearchParams(location.search);

    if (newProducer) {
      searchParams.set('producer', newProducer);
    } else {
      searchParams.delete('producer');
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

const menu = (
    <Menu onClick={(e) => handleSelectProducer(e.key)}>
      {producers.map((producer) => (
        <Menu.Item key={producer}>
          {producer}
        </Menu.Item>
      ))}
    </Menu>
  );
  

  return (
    <Dropdown overlay={menu}>
      <Button>
        {selectedProducer || 'Hãng'} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default FilterProducerComponent;


