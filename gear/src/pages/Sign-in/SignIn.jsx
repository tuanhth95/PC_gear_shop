import React, { useState } from 'react';
import { Button, Form,message } from 'antd';
import { StyleContainer, StyleLeftCon, StyleRightCon, StyleInput, StyleInputPassword } from './style';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const [form] = Form.useForm();

    const handleSignIn = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            const { username, password } = values;
            const response = await fetch('http://localhost:3001/api/user/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.status === 'OK') {
                message.success('Login success');
                // localStorage.setItem('accessToken', data.access_token);
                // localStorage.setItem('refreshToken', data.refresh_token);
                const { _id } = data.data; // Lấy _id từ dữ liệu trả về
                localStorage.setItem('userID', _id);
                history.push('/');
            } else {
                if (data.status === 'ERR') {
                    message.error(data.message || 'Login fail');
                } else {
                    message.error('Login fail');
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            //message.error('Đã xảy ra lỗi, vui lòng thử lại sau');
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyleContainer>
            <StyleLeftCon>
            <img src='https://i.pinimg.com/564x/64/c3/6b/64c36b10d3e8904e6a23fc59ed3ca060.jpg' alt='gear'
        style={{width:'300px', height:'300px', borderRadius: '50%'}}/>
        <h2 style={{textAlign:'center'}}>Chào mừng đến với GearShop, Chất lượng tốt, giá thành tốt, ưu đãi cực vui</h2>
            </StyleLeftCon>
            <StyleRightCon>
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A93FF' }}>Đăng nhập</h1>
            <Form form={form}>
                <Form.Item
                    label="Tên tài khoản"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên tài khoản!',
                        },
                    ]}
                    labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
                >
                    <StyleInput />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                    ]}
                    labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
                >
                    <StyleInputPassword />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={handleSignIn} loading={loading}>
                        Đăng nhập
                    </Button>
                </Form.Item>

                <p style={{textAlign: 'center'}}>Chưa có tài khoản? <Link to="/Register">Đăng ký</Link></p>
            </Form>
        </StyleRightCon>
        </StyleContainer>
        
    );
};

export default SignIn;
