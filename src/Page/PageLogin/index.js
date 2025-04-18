import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { instance } from "../../apis/instance";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";



const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function PageLogin() {
  const token = Cookies.get("token");
  const nav = useNavigate();
  const onFinish = async (values) => {
    const res = (await instance.post('/login', values)).data;
    console.log(res.data.token)
    Cookies.set('token', res.data.token, {expires: 3600 * 1000});
    nav('/class');
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5", // Background màu sáng
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px", // Chiều rộng của form đăng nhập
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo Shub */}
        <h3>Đăng nhập</h3>

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            width: "100%",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            initialValue="USER"
            style={{width: "100%"}}
            rules={[
              {
                required: true,
                message: "Please input your role!",
              },
            ]}
          >
            <Select
              defaultValue="lucy"
              options={[
                { value: "ADMIN", label: "Tôi là giáo viên" },
                { value: "USER", label: "Tôi là học sinh" },
              ]}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              <LoginOutlined /> Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        {/* Thêm thông tin hoặc link quên mật khẩu */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <a href="/forgot-password" style={{ fontSize: "14px" }}>
            Quên mật khẩu?
          </a>
        </div>
      </div>
    </div>
  );
}

export default PageLogin;
