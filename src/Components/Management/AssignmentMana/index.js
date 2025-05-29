import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";
import Cookies from "js-cookie";

function AssignmentMana() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const token = Cookies.get("token");
  const nav = useNavigate();
  const { id } = useParams();

  const fetchData = async (page = 1, keywordValue = "") => {
    try {
      const res = await instance.get(`/class/${id}/assignment`, {
        params: {
          keyword: keywordValue,
          page: page - 1,
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const content = res.data.data.content.map((item) => ({
        ...item,
        key: item.id,
      }));

      setData(content);
      setPagination({
        ...pagination,
        current: page,
        total: res.data.data.totalElements,
      });
    } catch (err) {
      if(err.response.status === 403){
        nav(`/error403`);
      }
      if(err.response.status === 401){
        nav(`/`);
      }
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, keyword);
  }, [loading]);

  const handleSearch = (value) => {
    setKeyword(value);
    fetchData(1, value);
  };

  const handleDelete = async (assId) => {
    await instance.delete(`/class/${id}/assignment/${assId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoading(!loading);
  };

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      render: (title) => <div style={{ fontWeight: "bold" }}>{title}</div>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      render: (value) => (value ? new Date(value).toLocaleString() : "—"),
    },
    {
      title: "Hết hạn",
      dataIndex: "dueDate",
      render: (value) => (value ? new Date(value).toLocaleString() : "—"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => {
        const menuItems = [
          {
            key: "1",
            label: (
              <Link to={`/class/${id}/assignment/${record.id}/detail`}>
                Xem chi tiết
              </Link>
            ),
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
            label: <a onClick={() => handleDelete(record.id)}>Xoá</a>,
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
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Input
          placeholder="Tìm kiếm bài tập..."
          allowClear
          onPressEnter={(e) => handleSearch(e.target.value)}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: "300px" }}
          suffix={<SearchOutlined />}
        />
        <Button type="primary" onClick={() => nav(`/class/${id}/create-ass`)}>
          Thêm bài tập
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: pagination.current,
          total: pagination.total,
          onChange: (page) => fetchData(page, keyword),
          showSizeChanger: false,
        }}
        style={{ marginTop: "16px" }}
      />
    </div>
  );
}

export default AssignmentMana;
