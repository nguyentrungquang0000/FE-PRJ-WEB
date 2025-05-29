import React, { useEffect, useState } from "react";
import { Table, Tooltip, Modal, Input, Upload, Button, message as antdMessage } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";
import Cookies from "js-cookie";
const getDriveFileId = (url) => {
  const match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
};
function LectureMana() {
  const { id } = useParams();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");
  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [multipartFile, setMultipartFile] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await instance.get(`/class/${id}/lecture`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setLectures(res.data.data);
      }catch(e){
        if(e.response.status === 403){
          nav(`/error403`);
        }
        if(e.response.status === 401){
          nav(`/`);
        }
      }
    };
    fetchData();
  }, [loading]);

  const handleDelete = async (lectureId) => {
    const res = await instance.delete(`/class/${id}/d/${lectureId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoading(!loading);
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isVideo = file.type.startsWith("video/");
      if (!isVideo) {
        antdMessage.error("Chỉ được upload file video!");
        return Upload.LIST_IGNORE;
      }
      setMultipartFile([file]); // giữ duy nhất 1 file
      return false; // không upload tự động
    },
    fileList: multipartFile,
    onRemove: () => setMultipartFile([]),
    maxCount: 1,
    multiple: false,
  };

  const handleCreateLecture = async () => {
    if (!title || multipartFile.length === 0) {
      antdMessage.error("Vui lòng nhập tiêu đề và chọn video.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("multipartFile", multipartFile[0]);
  
    try {
      await instance.post(`/class/${id}/lecture`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      antdMessage.success("Tạo bài giảng thành công!");
      setLoading(!loading);
    } catch (err) {
      antdMessage.error("Tạo bài giảng thất bại.");
      console.error(err);
    }
  
    setModalOpen(false);
    setTitle("");
    setDescription("");
    setMultipartFile([]);
  };
  

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Xem Video",
      key: "lectureUrl",
      render: (_, record) => {
        // Chuyển đổi lectureUrl thành dạng view URL đúng của Google Drive
        const viewUrl = `https://drive.google.com/file/d/${getDriveFileId(record.lectureUrl)}/view`;
        return (
          <a href={viewUrl} target="_blank" rel="noopener noreferrer">
            Xem
          </a>
        );
      },
    },
    
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-3">
          {/* <Tooltip title="Chỉnh sửa">
            <EditOutlined className="text-blue-500 cursor-pointer hover:text-blue-700" />
          </Tooltip> */}
          <Tooltip title="Xóa">
            <DeleteOutlined
              className="text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Danh sách video bài giảng</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
          Tạo bài giảng
        </Button>
      </div>

      <Table columns={columns} dataSource={lectures} rowKey="id" />

      <Modal
        title="Tạo bài giảng mới"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleCreateLecture}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Input
          placeholder="Tiêu đề bài giảng"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Input.TextArea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{ marginBottom: "1rem" }}
        />
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Chọn video bài giảng</Button>
        </Upload>
      </Modal>
    </div>
  );
}

export default LectureMana;
