import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import Header from "../../Components/Header";
import ClassMana from "../../Components/Management/ClassMana";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { instance } from "../../apis/instance";
function HomeClass() {
  const token = Cookies.get("token");
  let scope = "";
  if (token) {
    const decoded = jwtDecode(token);
    scope = decoded.scope;
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelOpenJoin, setModelOpenJoin] = useState(false);
  const [reload, setReload] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const showModalJoin = () => setModelOpenJoin(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleJoinCancel = ()=> setModelOpenJoin(false);
  const onFinish = (values) => {
    const fetchData = async() => {
      const res = await instance.post(`/create-classroom`,values,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(res.data.status === 200){
        setIsModalOpen(false);
        setReload((prev) => !prev);
      }
    }
    fetchData();
  }
  const clickSearch = (values) => console.log("Search:", values);
  const handleJoin = (value)=>{
    const fetchData = async()=>{
      try{
        const res = await instance.post(`/class`,{}, {
          params: {
            classId: value.classId
          },
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        if(res.data.status === 200){
          setModelOpenJoin(false);
        }
      }catch(error){
        console.error(error)
      }
      
    }
    fetchData();
  }
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Header />
      <div style={{ padding: "20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '20px' }}>
          <Form onFinish={clickSearch} style={{ display: "flex", gap: "10px" }}>
            <Form.Item name="search">
              <Input placeholder="Tìm kiếm lớp học..." style={{ width: 250, borderRadius: '4px', border: '1px solid #d9d9d9', padding: '8px 12px' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ borderRadius: '4px' }}>
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
            {scope === "ADMIN" ? (
              <Button type="primary" onClick={showModal} style={{ borderRadius: '4px' }}>
                Tạo lớp học
              </Button>
            ) : (
              <Button type="primary" onClick={showModalJoin} style={{ borderRadius: '4px' }}>
                Tham gia lớp học
              </Button>
            )}
        </div>
        <Modal title="Tham gia lớp học" open={modelOpenJoin} onCancel={handleJoinCancel} footer={null}>
          <Form onFinish={handleJoin}>
            <Form.Item name = "classId" rules={[{ required: true, message: "Vui lòng nhập tên lớp học!" }]}>
              <Input placeholder="Nhập mã lớp học"/>
            </Form.Item>
            <Form.Item style={{textAlign:'right'}}>
              <Button type="primary" htmlType="submit">
                Tham gia lớp học
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Tạo lớp học"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
          style={{ width: '500px' }} // Adjusted modal width
        >
          <Form
            name="classroom_form"
            layout="vertical"
            onFinish={onFinish}
            style={{ padding: '20px' }}
          >
            <Form.Item label="Tên lớp học" name="name" rules={[{ required: true, message: "Vui lòng nhập tên lớp học!" }]}>
              <Input placeholder="Nhập tên lớp học" style={{ borderRadius: '4px', border: '1px solid #d9d9d9', padding: '8px 12px' }} />
            </Form.Item>

            <Form.Item label="Chủ đề" name="section" rules={[{ required: true, message: "Vui lòng nhập phần!" }]}>
              <Input placeholder="Nhập phần" style={{ borderRadius: '4px', border: '1px solid #d9d9d9', padding: '8px 12px' }} />
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit" block style={{ borderRadius: '4px' }} >
                Tạo lớp học
              </Button>
            </Form.Item>
          </Form>
        </Modal>
    </div>
      <ClassMana  reload={reload}/>
    </div>
  );
}

export default HomeClass;