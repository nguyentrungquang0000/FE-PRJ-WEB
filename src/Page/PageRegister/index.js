import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { instance } from "../../apis/instance";

function PageRegister({ onSuccess }) {
  const [form] = Form.useForm();
  const [notification, setNotification] = useState('');

  const onFinish = async (values) => {
    console.log(values);
    try {
      // Gửi request đăng ký đến backend với đúng body format
      const response = await instance.post("/register", {
        name: values.name,
        phone: values.phone,
        sex: values.sex === "male" ? "Male" : values.sex === "female" ? "Female" : "Other", // Chuyển đổi giá trị sex
        address: values.address,
        email: values.email,
        password: values.password,
        role: values.role,
      });
      onSuccess(); // Đóng modal
      form.resetFields(); // Xóa form
      setNotification('');

    } catch (error) {
      setNotification(error.response.data.message);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Họ và tên"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
      >
        <Input placeholder="Nhập họ và tên" />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại" },
          {
            pattern: /^[0-9]{10}$/,
            message: "Số điện thoại không hợp lệ",
          },
        ]}
      >
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>

      <Form.Item
        label="Giới tính"
        name="sex"
        rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
      >
        <Select
          options={[
            { value: "male", label: "Nam" },
            { value: "female", label: "Nữ" },
            { value: "other", label: "Khác" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
      >
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
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
        <Button type="primary" htmlType="submit" block>
          Đăng ký
        </Button>
      </Form.Item>
      {notification && (
        <div style={{color:'red', display: 'center'}}>
          {notification}
        </div>
      )}
    </Form>
  );
}

export default PageRegister;
