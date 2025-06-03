import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { instance } from "../../apis/instance";
import Cookies from 'js-cookie';

const Profile = () => {
  const token = Cookies.get('token');
  const [studentData, setStudentData] = useState({});
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

  const handleChangePassword = (values)=>{
    const changePassword = async ()=>{
      try{
        const res = await instance.put(`/change-password`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        alert("Đổi mật khẩu thành công!");
        setIsPasswordModalOpen(false);
      }catch(error){
        alert(error.response?.data?.message || "Đã xảy ra lỗi.");
      }
    }
    changePassword();
    
  }

  useEffect(()=> {
    const fetchData= async()=>{
      try{
        const res = await instance.get(`/myinfo`, {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        })
        setStudentData(res.data.data)
      }catch(error) {}
    }
    fetchData();
  }, [])

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 50px" }}>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <Card style={{ backgroundColor: "#fff", marginBottom: 20, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <Descriptions title="Thông Tin Cá Nhân" bordered column={1}>
              <Descriptions.Item label="Họ và Tên">{studentData.name}</Descriptions.Item>
              <Descriptions.Item label="Giới Tính">{studentData.sex}</Descriptions.Item>
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
        <Form 
          form={form} 
          layout="vertical"
        >
          <Form.Item name="name" label="Họ và Tên" rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="sex" label="Giới Tính" rules={[{ required: true, message: "Vui lòng nhập giới tính" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa Chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}> 
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Đổi Mật Khẩu" open={isPasswordModalOpen} footer = {null} onCancel={() => setIsPasswordModalOpen(false)}>
        <Form 
          form={passwordForm} 
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Form.Item name="oldPassword" label="Mật Khẩu Hiện Tại" rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}> 
            <Input.Password />
          </Form.Item>
          <Form.Item name="newPassword" label="Mật Khẩu Mới" rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}> 
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Nhập Lại Mật Khẩu Mới" rules={[{ required: true, message: "Vui lòng nhập lại mật khẩu mới" }]}> 
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button  type="primary" htmlType="submit">Đổi mật khẩu</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
