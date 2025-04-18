import React, { useState } from "react";
import { Upload, Form, Input, DatePicker, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../apis/instance";
import Cookies from "js-cookie";

function CreateAssignment(){
  const nav = useNavigate();
  const token = Cookies.get("token");
  const {id} = useParams();
  const [fileList, setFileList] = useState([]);
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const showForm = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || ""); // phòng khi người dùng để trống
    formData.append("dueDate", values.dueDate.format("YYYY-MM-DD HH:mm:ss"));

    if (fileList.length > 0) {
      formData.append("multipartFile", fileList[0].originFileObj);
    }
    const res = await instance.post(`/class/${id}/assignment`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
    });
    if(res.data.status === 200){
      nav(`/class/${id}/assignment-mana`)
    }
  }

  return(
    <div style={{ maxWidth: "99%", margin: "0 auto", padding: "15px", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "15px" }}>
        <h2>Tạo bài tập</h2>  
      </div>
      <div>
        <Form layout="vertical" onFinish={showForm} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Form.Item
            label="Tiêu đề bài tập"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input placeholder="Nhập tiêu đề bài tập" style={{ borderRadius: "6px", padding: "6px" }} />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
          >
            <Input.TextArea rows={3} placeholder="Nhập mô tả bài tập" style={{ borderRadius: "6px", padding: "6px" }} />
          </Form.Item>

          <Form.Item label="Tệp đính kèm" name="multipartFile">
            <Upload
              fileList={fileList}
              beforeUpload={() => false} // Ngăn không cho tải lên ngay lập tức
              onChange={handleUploadChange}
              maxCount={1} // Giới hạn 1 file
            >
              <Button icon={<UploadOutlined />} style={{ borderRadius: "6px", padding: "6px" }}>Chọn tệp</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Hạn nộp"
            name="dueDate"
            rules={[{ required: true, message: "Vui lòng chọn hạn nộp!" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ borderRadius: "6px", padding: "6px" }}
            />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%", height: "38px", fontSize: "16px", fontWeight: "600" }}>
              Tạo bài tập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default CreateAssignment;