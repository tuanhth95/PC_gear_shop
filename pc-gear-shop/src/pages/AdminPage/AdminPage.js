import { Menu, message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getItem } from '../../utils';
import { FormOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminReview from '../../components/AdminReview/AdminReview';
import CustomizedContent from './components/CustomizedContent';
import { useQueries } from '@tanstack/react-query';

const AdminPage = () => {
  const [keySelected, setKeySelected] = useState('');
  
  const items = [
    getItem('Đánh giá', 'reviews', <FormOutlined />),
  ];

  const getAllReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/review/get-all-review`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      message.error('Failed to fetch reviews. Please try again later.');
      throw new Error('Failed to fetch reviews');
    }
  };

  // const { isLoading } = useQuery(['reviews'], getAllReviews, {
  //   staleTime: 60 * 1000, 
  // });

  const queries = useQueries({
    queries: [
      {queryKey: ['reviews'], queryFn: getAllReviews, staleTime: 1000 * 60}
    ]
  })

  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  }

  const renderPage = (key) => {
    switch (key) {
      case 'reviews':
        return <AdminReview />;
      default:
        return null;
    }
  }

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex', overflowX: 'hidden' }}>
      <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh'
          }}
          items={items} 
          selectedKeys={[keySelected]}
          onClick={handleOnCLick}
        />
        <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
          {!keySelected && (
            <CustomizedContent data={items} setKeySelected={setKeySelected} />
          )}
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
}

export default AdminPage;