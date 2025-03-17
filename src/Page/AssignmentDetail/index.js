import Header from "../../Components/Header";
import React, { useState } from "react";
import { Card, Upload, Button, message, Typography, Input, DatePicker } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Dragger } = Upload;

const AssignmentDetail = ({ assignment = {} }) => {
  // Gán giá trị mặc định nếu không có giá trị từ assignment
  const {
    title = "Bài tập Lập trình Java",
    teacher = "Nguyễn Văn B",
    deadline = "2025-03-15 23:59",
    description = "Hãy viết chương trình Java tính tổng các số từ 1 đến 100.",
    fileUrl = "https://example.com/file1.pdf", // Chỉ có một file
    datePosted = "2025-03-01 10:00",  // Thêm ngày đăng mặc định
  } = assignment;

  const [fileList, setFileList] = useState([]);

  // Xử lý upload file
  const uploadProps = {
    maxCount: 1, // Giới hạn chỉ cho phép upload 1 file
    beforeUpload: (file) => {
      if (file.type !== "application/pdf") {
        message.error("Chỉ được upload file PDF!");
        return Upload.LIST_IGNORE;
      }
      setFileList([file]); // Luôn chỉ giữ 1 file
      return false; // Không upload ngay, đợi user nhấn "Nộp bài"
    },
    onRemove: () => setFileList([]),
    fileList,
  };

  const handleSubmit = () => {
    if (fileList.length === 0) {
      message.warning("Vui lòng chọn file trước khi nộp bài!");
      return;
    }
    message.success("Bài tập đã được nộp thành công!");
    setFileList([]); // Xóa danh sách file sau khi nộp
  };

  return (
    <div>
      <Header/>
      <Card style={{ maxWidth: 600, margin: "20px auto", padding: 20, borderRadius: 10 }}>
        {/* Phần 1: Thông tin bài tập */}
        <div style={{ marginBottom: 20 }}>
          <Input defaultValue={title} />
          <Text strong>Người đăng: </Text><Text>{teacher}</Text><br />
          <Text strong>Ngày đăng: </Text><Text>{datePosted}</Text><br />
          <Text strong>Hạn nộp: </Text>
          <DatePicker showTime />
          <Text>{deadline}</Text>
        </div>

        {/* Phần 2: Mô tả bài tập & File đính kèm */}
        <div style={{ marginBottom: 20 }}>
          <Text strong>Mô tả: </Text>
          <Input.TextArea defaultValue={description}></Input.TextArea>
          <br />
          <Text strong>File đính kèm:</Text>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">Tải file</a>
        </div>
        <div>
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Kéo file PDF vào đây hoặc bấm để chọn file</p>
          </Dragger>
          <Button type="primary" block style={{ marginTop: 10 }} onClick={handleSubmit}>
            Lưu
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AssignmentDetail;
