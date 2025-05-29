import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { instance } from "../../apis/instance";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function PageLogin({ onSuccess }) {
  const nav = useNavigate();
  const [notification, setNotification] = useState('');

  const onFinish = async (values) => {
    try {
      const res = (await instance.post('/login', values)).data;
      Cookies.set('token', res.data.token, { expires: 3600 * 1000 });
      Cookies.set('role', res.data.role, { expires: 3600 * 1000 });
      Cookies.set('userId', res.data.userId, { expires: 3600 * 1000 });
      onSuccess(); // đóng modal
      nav('/class'); // điều hướng
    } catch (error) {
      if (error.response && error.response.data) {
        setNotification(error.response.data.message);
      }
    }
  };

  return (
    <Form
      name="loginForm"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="on"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Vui lòng nhập email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Vai trò"
        name="role"
        initialValue="USER"
        rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
      >
        <Select
          options={[
            { value: "ADMIN", label: "Tôi là giáo viên" },
            { value: "USER", label: "Tôi là học sinh" },
          ]}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block icon={<LoginOutlined />}>
          Đăng nhập
        </Button>
      </Form.Item>

      {notification && (
        <div style={{ color: "red", textAlign: "center" }}>{notification}</div>
      )}
    </Form>
  );
}

export default PageLogin;
