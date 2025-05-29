import React, { useEffect, useState } from "react";
import { Card, Typography, Divider } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";
import Cookies from "js-cookie";
import { SubmitAssStu } from "../SubmitAssStu";

const { Text, Title } = Typography;

const AssignmentDetailStu = () => {
  const { id, assId } = useParams();
  const token = Cookies.get("token");
  const nav = useNavigate();
  const [assignment, setAssignment] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/assignment/${assId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignment(res.data.data);
      } catch (error) {
        if(error.response.status === 403){
          nav(`/error403`);
        }
        console.error("Error fetching assignment:", error);
      }
    };
    fetchData();
  }, [assId, token]);

  const extractGoogleDriveId = (url) => {
    const match = url.match(/id=([^&]+)/);
    return match ? match[1] : "";
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "1.2rem",
        background: "#f9f9f9",
        minHeight: "100vh",
        gap: "2rem",
      }}
    >
      {/* Thông tin bài tập */}
      <Card
        title={<Title level={4}>{assignment.title}</Title>}
        style={{
          width: "100%",
          maxWidth: "700px",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ marginBottom: "1.2rem" }}>
          <Text strong>Ngày đăng:</Text> <Text>{new Date(assignment.createdDate).toLocaleString()}</Text> <br />
          <Text strong>Hạn nộp:</Text> <Text type="danger">{new Date(assignment.dueDate).toLocaleString()}</Text>
        </div>

        <Divider />

        <div style={{ marginBottom: "1.2rem" }}>
          <Text strong>Mô tả:</Text>
          <p style={{ marginTop: "0.5rem" }}>{assignment.description}</p>
        </div>

        <div>
          <Text strong>File đính kèm:</Text>{" "}
          {assignment.fileUrl ? (
            <a
              href={`https://drive.google.com/file/d/${extractGoogleDriveId(assignment.fileUrl)}/preview`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Xem file
            </a>
          ) : (
            <Text type="secondary">Không có file</Text>
          )}
        </div>
      </Card>

      {/* Phần nộp bài (SubmitAssStu) */}
      <SubmitAssStu  />
    </div>
  );
};

export default AssignmentDetailStu;
