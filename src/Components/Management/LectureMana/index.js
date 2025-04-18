import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";
import Cookies from "js-cookie";
function LectureMana() {
  const {id} = useParams();
  const [lectures, setLectures] = useState([])
  const token = Cookies.get("token");
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    const fetchData = async()=>{
      const res = await instance.get(`/class/${id}/lecture`);
      setLectures(res.data.data)
    }
    fetchData();
  }, [loading])

  const handleDelete = async(lectureId) => {
    const res = await instance.delete(
      `/class/${id}/d/${lectureId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMessage(res.data.message);
    console.log(message);
    setLoading(!loading);
  }

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
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-3">
          <Tooltip title="Chỉnh sửa">
            <EditOutlined className="text-blue-500 cursor-pointer hover:text-blue-700" />
          </Tooltip>
          <Tooltip title="Xóa">
            <DeleteOutlined className="text-red-500 cursor-pointer hover:text-red-700" onClick={()=> handleDelete(record.id)}/>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh sách video bài giảng</h2>
      <Table columns={columns} dataSource={lectures} rowKey="id" />
    </div>
  );
}

export default LectureMana;
