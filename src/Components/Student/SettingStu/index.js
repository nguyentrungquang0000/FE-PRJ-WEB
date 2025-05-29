import React, { useState } from "react";
import { Button, Modal, Typography, Divider } from "antd";
import { instance } from "../../../apis/instance";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';

const { Title, Paragraph } = Typography;

export function SettingStu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {id} = useParams();
  const token = Cookies.get('token');
  const nav = useNavigate();
  const handleLeaveGroup = () => setIsModalOpen(true);
  const handleOk = async () => {
    try{
      await instance.put(`/class/${id}/leave`, {}, {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      setIsModalOpen(false);
      nav(`/class`);
      alert("Rời thành công!")
    }catch(error){}

  };
  const handleCancel = () => setIsModalOpen(false);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        boxSizing: "border-box",
        overflow: "hidden", // tránh tràn scroll toàn trang
      }}
    >
      {/* Nội quy */}
      <div
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          overflowY: "auto",
        }}
      >
        <Title level={4}>📘 Nội quy lớp học</Title>
        <Divider />
        <Paragraph style={{ fontSize: "20px", lineHeight: "1.8" }}>
          <div>
            <strong style={{ fontSize: "16px" }}>1.</strong> Tôn trọng giáo viên
            và các thành viên khác trong lớp.
          </div>
          <div>
            <strong style={{ fontSize: "16px" }}>2.</strong> Không spam hoặc gửi
            tin nhắn không liên quan đến bài học.
          </div>
          <div>
            <strong style={{ fontSize: "16px" }}>3.</strong> Hoàn thành bài tập
            đúng hạn và nghiêm túc.
          </div>
          <div>
            <strong style={{ fontSize: "16px" }}>4.</strong> Không chia sẻ link
            lớp học cho người ngoài.
          </div>
          <div>
            <strong style={{ fontSize: "16px" }}>5.</strong> Tham gia đầy đủ các
            buổi học trực tuyến.
          </div>
          <div>
            <strong style={{ fontSize: "16px" }}>6.</strong> Giữ thái độ tích
            cực, hợp tác khi làm việc nhóm.
          </div>
          <div>
            <strong style={{ fontSize: "16px" }}>7.</strong> Báo cáo với giáo
            viên nếu phát hiện hành vi sai trái.
          </div>
        </Paragraph>
      </div>

      {/* Rời nhóm */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button type="primary" danger onClick={handleLeaveGroup}>
          Rời nhóm
        </Button>
      </div>

      <Modal
        title="Xác nhận rời nhóm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Rời nhóm"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn rời nhóm này không?</p>
      </Modal>
    </div>
  );
}
