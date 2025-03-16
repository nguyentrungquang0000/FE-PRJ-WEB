import React, { useState } from "react";
import { Card, Avatar, Descriptions, Button, Modal, Form, Input } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined, LockOutlined } from "@ant-design/icons";
import Header from "../../Components/Header";

const initialStudentData = {
  id: "STU123456",
  name: "Nguyễn Văn A",
  age: 16,
  gender: "Male",
  class: "10A1",
  email: "nguyenvana@example.com",
  phone: "0987654321",
  address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
  guardian: {
    name: "Nguyễn Văn B",
    relation: "Father",
    phone: "0912345678",
  },
};

const Profile = () => {
  const [studentData, setStudentData] = useState(initialStudentData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue(studentData);
    setIsModalOpen(true);
  };

  const showPasswordModal = () => {
    passwordForm.resetFields();
    setIsPasswordModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setStudentData(values);
      setIsModalOpen(false);
    });
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 50px" }}>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <Card style={{ backgroundColor: "#fff", marginBottom: 20, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <Descriptions title="Thông Tin Cá Nhân" bordered column={1}>
              <Descriptions.Item label="ID">{studentData.id}</Descriptions.Item>
              <Descriptions.Item label="Họ và Tên">{studentData.name}</Descriptions.Item>
              <Descriptions.Item label="Tuổi">{studentData.age}</Descriptions.Item>
              <Descriptions.Item label="Giới Tính">{studentData.gender}</Descriptions.Item>
              <Descriptions.Item label="Lớp">{studentData.class}</Descriptions.Item>
              <Descriptions.Item label="Địa Chỉ">
                <HomeOutlined /> {studentData.address}
              </Descriptions.Item>
            </Descriptions>
            <Button type="primary" onClick={showModal} style={{ marginTop: 20 }}>
              Chỉnh sửa thông tin
            </Button>
          </Card>

          <Card style={{ backgroundColor: "#fff", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <Descriptions title="Thông Tin Tài Khoản" bordered column={1}>
              <Descriptions.Item label="Email">
                <MailOutlined /> {studentData.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                <PhoneOutlined /> {studentData.phone}
              </Descriptions.Item>
            </Descriptions>
            <Button type="primary" onClick={showPasswordModal} style={{ marginTop: 20 }}>
              Đổi Mật Khẩu
            </Button>
          </Card>
        </div>
      </div>

      <Modal title="Chỉnh sửa thông tin cá nhân" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Họ và Tên" rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Tuổi" rules={[{ required: true, message: "Vui lòng nhập tuổi" }]}> 
            <Input type="number" />
          </Form.Item>
          <Form.Item name="gender" label="Giới Tính" rules={[{ required: true, message: "Vui lòng nhập giới tính" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="class" label="Lớp" rules={[{ required: true, message: "Vui lòng nhập lớp" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa Chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}> 
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Đổi Mật Khẩu" open={isPasswordModalOpen} onOk={() => setIsPasswordModalOpen(false)} onCancel={() => setIsPasswordModalOpen(false)}>
        <Form form={passwordForm} layout="vertical">
          <Form.Item name="oldPassword" label="Mật Khẩu Hiện Tại" rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}> 
            <Input.Password />
          </Form.Item>
          <Form.Item name="newPassword" label="Mật Khẩu Mới" rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}> 
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Nhập Lại Mật Khẩu Mới" rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu mới" }]}> 
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
