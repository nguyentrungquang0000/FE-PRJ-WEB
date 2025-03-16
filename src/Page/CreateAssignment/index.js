import React, { useState } from "react";
import { Upload, Form, Input, DatePicker, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function CreateAssignment(){
  const [fileList, setFileList] = useState([]);
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const showForm = (values) => {
    console.log("infoAss", values)
  }

  return(
    <div>
      <div>
        <h2>Tạo bài tập</h2>  
      </div>
      <div>
        <Form layout="vertical" onFinish={showForm}>
          <Form.Item
            label="Tiêu đề bài tập"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input placeholder="Nhập tiêu đề bài tập" />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea rows={4} placeholder="Nhập mô tả bài tập" />
          </Form.Item>

          <Form.Item label="Tệp đính kèm" name="attachment">
            <Upload
              fileList={fileList}
              beforeUpload={() => false} // Ngăn không cho tải lên ngay lập tức
              onChange={handleUploadChange}
              maxCount={1} // Giới hạn 1 file
            >
              <Button icon={<UploadOutlined />}>Chọn tệp</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Hạn nộp"
            name="dueDate"
            rules={[{ required: true, message: "Vui lòng chọn hạn nộp!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo bài tập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    
  )
}

export default CreateAssignment;