import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function PageLogin() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5', // Background màu sáng
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px', // Chiều rộng của form đăng nhập
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Logo Shub */}
        <h3>
          Đăng nhập 
        </h3>

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            width: '100%',
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
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

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              <LoginOutlined /> Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        {/* Thêm thông tin hoặc link quên mật khẩu */}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <a href="/forgot-password" style={{ fontSize: '14px' }}>Quên mật khẩu?</a>
        </div>
      </div>
    </div>
  );
}

export default PageLogin;
