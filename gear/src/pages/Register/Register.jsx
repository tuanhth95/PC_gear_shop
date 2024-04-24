import React, {useState} from 'react'
import { Button, Form, message} from 'antd';
import { WrapperContainer, StyleInput, StyleInputPassword} from './style';
import { Link } from 'react-router-dom';
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
          //message.error('Mật khẩu xác nhận không khớp');
          alert("not match")
          return;
        }
        try {
          const response = await fetch('http://localhost:3001/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          //console.log(data); 
          if (response.ok) {
            message.success('Đăng ký thành công');
            setFormData({
              username: '',
              email: '',
              phone: '',
              address: '',
              password: '',
              confirmPassword: '',
            });
            // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
            window.location.href = '/SignIn';
          } else {
            message.error(data.message || 'Đã có lỗi xảy ra');
          }
        } catch (error) {
          console.error(error); 
        }
      };    
  return (
    <div>
      <h1 style={{display:'flex', alignItems: 'center', justifyContent:'center'}}>Đăng nhập</h1>
      <WrapperContainer>
      <Form>
        <Form.Item
            label="Tên tài khoản"
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}>
        <StyleInput name="username" value={formData.username} onChange={handleChange}/>
        </Form.Item>

        <Form.Item
            label="Email"
            name="email"
            rules={[
                {
                required: true,
                message: 'Please input your email!',
                },
            ]}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}>
        <StyleInput name="email" value={formData.email} onChange={handleChange}/>
        </Form.Item>
        
        <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
                {
                required: true,
                message: 'Please input your phone!',
                },
            ]}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}>
        <StyleInput name="phone" value={formData.phone} onChange={handleChange}/>
        </Form.Item>

        <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
                {
                required: true,
                message: 'Please input your address!',
                },
            ]}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}>
        <StyleInput name="address" value={formData.address} onChange={handleChange} />
        </Form.Item>

        <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}>
        <StyleInputPassword name="password" value={formData.password} onChange={handleChange}/>
        </Form.Item>

        <Form.Item
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            rules={[
                {
                required: true,
                message: 'Please input your confirm pasword!',
                },
            ]}
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12}}>
        <StyleInputPassword name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8,span: 16,}}>
            <div onClick={handleSubmit}><Button type="primary" htmlType="submit">Đăng ký</Button></div>
        </Form.Item>
        <p>Đã có tài khoản? <Link to="/SignIn">Đăng nhập</Link></p>
    </Form>
    </WrapperContainer> 
    </div>
    
  )
}

export default Register
