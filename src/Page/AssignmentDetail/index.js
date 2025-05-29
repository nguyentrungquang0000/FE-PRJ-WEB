import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Form, Input, Modal, Checkbox, Upload, message, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../apis/instance";
import Cookies from 'js-cookie';
import dayjs from 'dayjs'; // Bổ sung nếu chưa có

const AssignmentDetail = () => {
  const { id, assId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const token = Cookies.get('token');
  const [assignment, setAssignment] = useState({});
  const [change, setChange] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/assignment/${assId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const data = res.data.data;
        setAssignment(data);
        form.setFieldsValue({
          title: data.title,
          description: data.description,
          dueDate: data.dueDate ? dayjs(data.dueDate) : null // Chuyển sang object dayjs
        });
      } catch (err) {
        if(err.response.status === 403){
          nav(`/error403`);
        }
        if(err.response.status === 401){
          nav(`/`);
        }
        console.log(err.message);
      }
    };
    fetchData();
  }, [loading]);

  const getPreviewUrl = (url) => {
    const match = url.match(/id=([^&]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  };
  

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description || "");

      // Format ngày đúng định dạng
      if (values.dueDate) {
        formData.append("dueDate", dayjs(values.dueDate).format("YYYY-MM-DD HH:mm:ss"));
      }

      formData.append("change", change ? "true" : "false");
      formData.append("multipartFile", (change && fileList.length > 0) ? fileList[0].originFileObj : null);

      const res = await instance.put(`/class/${id}/assignment/${assId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setLoading(!loading);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      message.error("Cập nhật thất bại!");
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "20px 50px" }}>
          <div style={{ width: "100%", maxWidth: "800px" }}>
            <Card style={{ backgroundColor: "#fff", marginBottom: 20, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
              <Descriptions title="Thông Tin Bài Tập" bordered column={1}>
                <Descriptions.Item label="Tiêu đề">{assignment.title}</Descriptions.Item>
                <Descriptions.Item label="Mô tả">{assignment.description}</Descriptions.Item>
                <Descriptions.Item label="Hạn nộp">{new Date(assignment.dueDate).toLocaleString()}</Descriptions.Item>
                <Descriptions.Item label="Ngày đăng">{new Date(assignment.createdDate).toLocaleString()}</Descriptions.Item>
                {assignment.fileUrl && (
                  <Descriptions.Item label="File đính kèm">
                    <a
                      href={getPreviewUrl(assignment.fileUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Xem file đính kèm
                    </a>
                  </Descriptions.Item>
                )}

              </Descriptions>
              <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginTop: 20 }}>
                Đổi Thông tin
              </Button>
            </Card>
          </div>
        </div>

        <Modal
          title="Chỉnh sửa thông tin bài tập"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={handleEditSubmit}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              label="Hạn nộp"
              name="dueDate"
              rules={[{ required: true, message: "Vui lòng chọn hạn nộp!" }]}>
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                style={{ borderRadius: "6px", padding: "6px" }}
              />
            </Form.Item>

            <Form.Item>
              <Checkbox checked={change} onChange={(e) => setChange(e.target.checked)}>
                Tải file mới
              </Checkbox>
            </Form.Item>

            {change && (
              <Form.Item
                name="file"
                label="Tải lên file"
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                >
                  <Button icon={<UploadOutlined />}>Chọn file</Button>
                </Upload>
              </Form.Item>
            )}
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AssignmentDetail;
