import React, { useEffect, useState } from "react";
import { Card, Upload, Button, message, Typography } from "antd";
import { InboxOutlined, GoogleOutlined } from "@ant-design/icons";
import { instance } from "../../../apis/instance";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const { Dragger } = Upload;
const { Text, Title } = Typography;

export function SubmitAssStu() {
  const token = Cookies.get("token");
  const { id, assId } = useParams();
  const [submit, setSubmit] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/submit/${assId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.status === 200) {
          setSubmit(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching submitted assignment:", error);
      }
    };
    fetchData();
  }, [assId, token, loading]);

  function extractFileId(url) {
    const match = url.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]{10,})/);
    return match ? match[1] : "";
  }

  const uploadProps = {
    maxCount: 1,
    beforeUpload: (file) => {
      if (file.type !== "application/pdf") {
        message.error("Chỉ được upload file PDF!");
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false;
    },
    onRemove: () => setFileList([]),
    fileList,
  };

  const handleSubmit = async () => {
    if (fileList.length === 0) {
      message.warning("Vui lòng chọn file trước khi nộp bài!");
      return;
    }

    const formData = new FormData();
    formData.append("multipartFile", fileList[0]);

    try {
      const res = await instance.post(
        `/class/${id}/assignment/${assId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === 200) {
        message.success("Nộp bài thành công!");
        setSubmit(res.data.data);
        setFileList([]);
        setLoading(!loading);
      } else {
        console.log("Quá hạn");
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      message.error("Đã có lỗi xảy ra khi nộp bài.");
    }
  };

  const handleCancelSubmit = async () => {
    try {
      const res = await instance.delete(
        `/class/${id}/assignment/${assId}/d/${submit.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.status === 200) {
        message.success("Huỷ bài nộp thành công!");
        setSubmit(null);
        setLoading(!loading);
      } else {
        message.error("Huỷ bài nộp thất bại!");
      }
    } catch (error) {
      console.error("Error canceling submission:", error);
      message.error("Đã có lỗi khi huỷ bài nộp.");
    }
  };

  return (
    <>
      {submit ? (
        <Card
          title={<Title level={4}>Bài đã nộp</Title>}
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <GoogleOutlined style={{ fontSize: "20px", color: "#4285F4" }} />
            <iframe
              src={`https://drive.google.com/file/d/${extractFileId(
                submit.submitUrl
              )}/preview`}
              width="100%"
              height="480"
              allow="autoplay"
              style={{ borderRadius: "8px", border: "none" }}
            />
          </div>
          {submit.statusSubmit != "SUBMITTED" && (
            <Button
              danger
              block
              style={{ borderRadius: "8px", fontWeight: 500 }}
            >
              Điểm: {submit.score}
            </Button>
          )}
          {submit.statusSubmit == "SUBMITTED" && (
            <Button
              danger
              block
              onClick={handleCancelSubmit}
              style={{ borderRadius: "8px", fontWeight: 500 }}
            >
              Huỷ nộp
            </Button>
          )}
        </Card>
      ) : (
        <Card
          title={<Title level={4}>Bài nộp của bạn</Title>}
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Dragger {...uploadProps} style={{ borderRadius: "8px" }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Kéo file PDF vào đây hoặc click để chọn
            </p>
          </Dragger>
          <Button
            type="primary"
            block
            style={{ marginTop: "1rem", borderRadius: "8px", fontWeight: 500 }}
            onClick={handleSubmit}
          >
            Nộp bài
          </Button>
        </Card>
      )}
    </>
  );
}
