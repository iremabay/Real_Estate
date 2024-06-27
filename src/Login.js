import React from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './App.css';

const users = [
  { email: 'irem@gmail.com', password: '123456' },
  { email: 'levent@hotmail.com', password: 'password' },
];

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (user) {
      onLogin();
      navigate('/dashboard');
    } else {
      console.log('Failed: Invalid email or password');
    }
  };

  return (
    <div className="appBg">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
        autoComplete="off"
        className="loginForm"
      >
        <Typography.Title className="welcomeTitle">Welcome</Typography.Title>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email!',
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
