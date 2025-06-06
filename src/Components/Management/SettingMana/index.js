import React, { useState } from 'react';
import { Modal, Button, Input, Typography } from 'antd';
import { instance } from '../../../apis/instance';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';
const { Title, Paragraph } = Typography;

export function SettingMana() {
  const [className, setClassName] = useState('Lớp học 1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newClassName, setNewClassName] = useState(className);
  const {id} = useParams();
  const token = Cookies.get('token');
  const nav = useNavigate();
  
  const showModal = () => {
    setNewClassName(className);
    setIsModalVisible(true);
  };

  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  
  const handleOk = () => {
    setClassName(newClassName);
    setIsModalVisible(false);
  };

  
  const handleDelete = () => {
    const fetchData = async()=>{
      try{
        await instance.delete(`/delete-classroom/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        })
        alert('Xoá thành công');
        nav(`/class`);
      }catch(e){}
    }
    fetchData()
  };


  return (
    <>
      <div style={{
        padding: '20px', 
        maxWidth: '100%', 
        margin: '0 auto', 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
      }}>
        <Title level={2}>Nội quy lớp học online</Title>
        <Paragraph>
          1. Học viên cần chuẩn bị đầy đủ tài liệu trước mỗi buổi học.
        </Paragraph>
        <Paragraph>
          2. Tắt mic khi không tham gia phát biểu để tránh nhiễu âm thanh.
        </Paragraph>
        <Paragraph>
          3. Tuân thủ thời gian học và tham gia đầy đủ các buổi học.
        </Paragraph>

        <div style={{ marginTop: '20px' }}>
          <Title level={4}>Thông tin lớp học</Title>
          <div>
            <strong>Tên lớp: </strong>
            <span>{className}</span>
          </div>
          <Button 
            type="primary" 
            style={{
              marginTop: '10px', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              backgroundColor: '#4CAF50', 
              color: 'white',
              border: 'none',
              transition: 'background-color 0.3s ease'
            }}
            onClick={showModal}
          >
            Đổi tên lớp
          </Button>
          <Button
            type="danger"
            style={{
              marginTop: '10px', 
              marginLeft: '10px', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              backgroundColor: '#f44336', 
              color: 'white',
              border: 'none',
              transition: 'background-color 0.3s ease'
            }}
            onClick={handleDelete}
          >
            Xóa lớp
          </Button>
        </div>

        
        <Modal
          title="Đổi tên lớp học"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{
            borderRadius: '8px',
          }}
        >
          <Input
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            placeholder="Nhập tên lớp mới"
            style={{
              borderRadius: '5px', 
              padding: '10px',
              border: '1px solid #ccc'
            }}
          />
        </Modal>
      </div>
    </>
  );
}
