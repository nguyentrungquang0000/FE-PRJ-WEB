import React from "react";
import { Table, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const data = [
  {
    id: 1,
    url: "https://via.placeholder.com/150", // Ảnh giả lập
    title: "Introduction to Algebra",
    type: "image",
  },
  {
    id: 2,
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    title: "Newton's Laws of Motion",
    type: "video",
  },
  {
    id: 3,
    url: "https://via.placeholder.com/150",
    title: "World War II Overview",
    type: "image",
  },
  {
    id: 4,
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    title: "Photosynthesis Process",
    type: "video",
  },
];

function LectureMana() {
  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Media",
      dataIndex: "url",
      key: "media",
      render: (url, record) =>
        record.type === "image" ? (
          <img src={url} alt="Lecture Media" style={{ width: 100, height: 100, objectFit: "cover" }} />
        ) : (
          <video width="100" height="100" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ),
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
            <DeleteOutlined className="text-red-500 cursor-pointer hover:text-red-700" />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh sách video bài giảng</h2>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
}

export default LectureMana;
