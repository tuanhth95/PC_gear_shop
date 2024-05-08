import React, { useState, useEffect } from 'react';
import { Button, Form, message } from 'antd';
import { WrapperContainer, StyleInput } from './style';
import { useSelector } from 'react-redux';

const UserInfo = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
  });
  const userId = useSelector(state => state.user.id);

  useEffect(() => {
    fetchUserData();
  }, [userId]);
  
  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/get-details/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUserData(data.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await fetch(`http://localhost:3001/api/user/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
  
      setUserData({
        username: '',
        email: '',
        phone: '',
        address: '',
      });
  
      message.success('Thông tin người dùng đã được cập nhật thành công');
      fetchUserData();
      console.log(data.data);
    } catch (error) {
      console.error(error);
      message.error('Đã xảy ra lỗi khi cập nhật thông tin người dùng');
    }
  };

  return (
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Thông tin người dùng</h1>
      <WrapperContainer>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Tên tài khoản" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            <StyleInput name="username" value={userData.username} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Email" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            <StyleInput name="email" value={userData.email} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Số điện thoại" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            <StyleInput name="phone" value={userData.phone} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Địa chỉ" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            <StyleInput name="address" value={userData.address} onChange={handleChange} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div onClick={handleSubmit}>
              <Button type="primary" htmlType="submit">
                Chỉnh sửa thông tin
              </Button>
            </div>
          </Form.Item>
        </Form>
      </WrapperContainer>
    </div>
  );
};

export default UserInfo;