import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { WrapperContainer } from './style';
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
                localStorage.setItem('accessToken', data.access_token);
                localStorage.setItem('refreshToken', data.refresh_token);
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
        <WrapperContainer>
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Đăng nhập</h1>
            <Form
                form={form}
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 15 }}
            >
                <Form.Item
                    label="Tên tài khoản"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên tài khoản!',
                        },
                    ]}
                >
                    <Input />
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
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 9, span: 15 }}>
                    <Button type="primary" onClick={handleSignIn} loading={loading}>
                        Đăng nhập
                    </Button>
                </Form.Item>

                <p>Chưa có tài khoản? <Link to="/Register">Đăng ký</Link></p>
            </Form>
        </WrapperContainer>
    );
};

export default SignIn;
