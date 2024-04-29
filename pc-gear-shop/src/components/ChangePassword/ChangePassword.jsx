import React, { useState } from 'react';
import { Button, Form, message } from 'antd';
import { WrapperContainer, StyleInputPassword} from './style';
import bcrypt from 'bcryptjs';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmNewPassword') setConfirmNewPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      message.error('Mật khẩu mới và nhập lại mật khẩu mới không khớp.');
      return;
    }

    try {
      // Lấy dữ liệu user để kiểm tra mật khẩu cũ
      //const userId = "662f5f52be6e46cd5d2f6a4f"; 
      const userId = localStorage.getItem('userID');
      const response = await fetch(`http://localhost:3001/api/user/get-details/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const user = data.data;

      // Kiểm tra mật khẩu cũ
      if (!bcrypt.compareSync(oldPassword, user.password)) {
        message.error('Mật khẩu cũ không đúng. Vui lòng nhập lại.');
        return;
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10); 
      // Cập nhật mật khẩu mới
      const updateUser = {
        ...user,
        password: hashedNewPassword,
      };

      // Gửi request PUT để cập nhật mật khẩu mới
      await fetch(`http://localhost:3001/api/user/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUser),
      });

      message.success('Cập nhật mật khẩu thành công.');
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      console.error(error);
      message.error('Đã xảy ra lỗi khi cập nhật mật khẩu.');
    }
  };

  return (
    <div>
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chỉnh sửa mật khẩu</h1>
      <WrapperContainer>
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Mật khẩu cũ">
            <StyleInputPassword type="password" name="oldPassword" value={oldPassword} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Mật khẩu mới">
            <StyleInputPassword type="password" name="newPassword" value={newPassword} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Nhập lại mật khẩu mới">
            <StyleInputPassword type="password" name="confirmNewPassword" value={confirmNewPassword} onChange={handleChange} />
          </Form.Item>

          <Form.Item>
            <div onClick={handleSubmit}><Button type="primary" htmlType="submit">Cập nhật mật khẩu</Button></div>
          </Form.Item>
        </Form>
      </WrapperContainer>
    </div>
  );
};

export default ChangePassword;
