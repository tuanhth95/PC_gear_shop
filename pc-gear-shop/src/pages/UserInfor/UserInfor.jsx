// import React, { useState, useEffect } from 'react';
 import React, { useState } from 'react';

import { Button, Form, Input } from 'antd';
import { WrapperContainer, StyleInput } from './style';

const UserInfo = () => {
  // const [userData, setUserData] = useState({
  //   username: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   password: '',
  //   confirmPassword: '',
  // });

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const userId = "66278323e4d8763550e071f1"; 
  //       const response = await fetch(`http://localhost:3001/api/user/get-details/${userId}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       const data = await response.json();
  //       setUserData(data.data); 
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
    
  //   fetchUserData(); 
  // }, []);
  const [userData, setUserData] = useState({
    username: 'user123',
    email: 'user123@example.com',
    phone: '0123456789',
    address: '123 Fake Street',
    password: '',
    confirmPassword: '',
  });
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
      const userId = "66278323e4d8763550e071f1"; 
      const response = await fetch(`http://localhost:3001/api/user/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Thông tin người dùng</h1>
      <WrapperContainer initialValues={{ remember: true }}>
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

          <Form.Item label="Mật khẩu" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            <Input.Password name="password" value={userData.password} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Nhập lại mật khẩu" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
            <Input.Password name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">Chỉnh sửa thông tin</Button>
          </Form.Item>
        </Form>
      </WrapperContainer>
    </div>
  );
};

export default UserInfo;
