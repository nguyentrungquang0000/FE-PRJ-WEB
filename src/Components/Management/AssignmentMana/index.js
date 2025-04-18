import { CaretDownOutlined } from "@ant-design/icons";
import { render } from "@testing-library/react";
import { Button, Dropdown, Table } from "antd";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";
import Cookies from "js-cookie";

function AssignmentMana() {
  const [loading, setLoading] = useState(false); 
  const token = Cookies.get("token");
  const nav = useNavigate();
  const [data, setData] = React.useState([]);
  const { id } = useParams();
  
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(`/class/${id}/assignment`);
      console.log(res);
      res.data.data.content.forEach((element) => {
        element.key = element.id;
      });
      setData(res.data.data.content);
    };
    fetchData();
  }, [loading]);

  const handleDelete = async (assId) =>{
    const res = await instance.delete(`/class/${id}/assignment/${assId}`,{
      headers:{
        Authorization: `Bearer ${token}`
      },
    })
    console.log(res.data.message);
    setLoading(!loading);
  }

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      render: (title) => <div style={{ fontWeight: "bold" }}>{title}</div>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
    },
    {
      title: "Hết hạn",
      dataIndex: "dueDate",
      render: (deadline) => <div style={{ color: "red" }}>{deadline}</div>,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        const menuItems = [
          {
            key: "1",
            label: <Link to="/assignment-detail">Xem chi tiết</Link>,
          },
          {
            key: "2",
            label: (
              <Link to={`/class/${id}/assignment/${record.id}`}>
                Xem bài nộp
              </Link>
            ),
          },
          {
            key: "3",
            label: (
              <a onClick={()=> handleDelete(record.id)}>
                Xoá
              </a>
            ),
          },
          {
            key: "4",
            label: <Link to="/scoreboard">Xem kết quả</Link>,
          },
        ];
      
        return (
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <Button>
              <CaretDownOutlined />
            </Button>
          </Dropdown>
        );
      }
      
    },
  ];
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Danh sách bài tập</h2>
        <Button type="primary" onClick={() => nav(`/class/${id}/create-ass`)}>
          Thêm bài tập
        </Button>
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AssignmentMana;
