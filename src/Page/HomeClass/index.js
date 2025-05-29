import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import Header from "../../Components/Header";
import ClassMana from "../../Components/Management/ClassMana";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { instance } from "../../apis/instance";

function HomeClass() {
  const nav = useNavigate();
  const token = Cookies.get("token");

  const scope = Cookies.get('role');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelOpenJoin, setModelOpenJoin] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const showModalJoin = () => setModelOpenJoin(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleJoinCancel = () => setModelOpenJoin(false);
  const [notification, setNotification] = useState('');
  const onFinish = (values) => {
    const fetchData = async () => {
      const res = await instance.post(`/create-classroom`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status === 200) {
        setIsModalOpen(false);
      }
    };
    fetchData();
    
  };

  const handleJoin = (value) => {
    const fetchData = async () => {
      try {
        const res = await instance.post(
          `/class`,
          {},
          {
            params: {
              classId: value.classId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === 200) {
          setModelOpenJoin(false);
        }
      } catch (error) {
        setNotification(error.response.data.message)
      }
    };
    fetchData();
  };

  return (
    
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Header />
      <div style={{ padding: "20px 40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          
          
          {scope === "ADMIN" ? (
            <Button type="primary" onClick={showModal} style={{ borderRadius: "4px" }}>
              Tạo lớp học
            </Button>
          ) : (
            <Button type="primary" onClick={showModalJoin} style={{ borderRadius: "4px" }}>
              Tham gia lớp học
            </Button>
          )}
        </div>

        <Modal title="Tham gia lớp học" open={modelOpenJoin} onCancel={handleJoinCancel} footer={null}>
          <Form onFinish={handleJoin}>
            <Form.Item
              name="classId"
              rules={[{ required: true, message: "Vui lòng nhập mã lớp học!" }]}
            >
              <Input placeholder="Nhập mã lớp học" />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Tham gia lớp học
              </Button>
            </Form.Item>
            {notification && <div style={{color: 'red', display: 'center'}}>{notification}</div>}
          </Form>
        </Modal>

        <Modal
          title="Tạo lớp học"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
          style={{ width: "500px" }}
        >
          <Form
            name="classroom_form"
            layout="vertical"
            onFinish={onFinish}
            style={{ padding: "20px" }}
          >
            <Form.Item
              label="Tên lớp học"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên lớp học!" }]}
            >
              <Input
                placeholder="Nhập tên lớp học"
                style={{
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                  padding: "8px 12px",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Chủ đề"
              name="section"
              rules={[{ required: true, message: "Vui lòng nhập phần!" }]}
            >
              <Input
                placeholder="Nhập phần"
                style={{
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                  padding: "8px 12px",
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block style={{ borderRadius: "4px" }}>
                Tạo lớp học
              </Button>
            </Form.Item>
          </Form>
        </Modal>


        <ClassMana />
      </div>
    </div>
  );
}

export default HomeClass;
