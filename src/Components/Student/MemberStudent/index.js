import { Table, Avatar, Input } from "antd";
import { useEffect, useState } from "react";
import { instance } from "../../../apis/instance";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { UserOutlined } from "@ant-design/icons";

export function MemberStudent() {
  const token = Cookies.get("token");
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0); // page bắt đầu từ 0
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const nav = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/class/${id}/member`, {
          params: { keyword, page, limit },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMembers(res.data.data.content);
        setTotal(res.data.data.totalElements);
      } catch (error) {
        if(error.response){
          if(error.response.status === 403){
            nav(`/error403`);
          }
        }
      }
    };
    fetchData();
  }, [keyword, page, limit, id, token]);

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "studentName",
      key: "studentName",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar size="large" icon={<UserOutlined />} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const onSearch = (value) => {
    setKeyword(value);
    setPage(0); // Reset về trang 0 khi tìm kiếm mới
  };

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        height: "100%",
      }}
    >
      <Input.Search
        placeholder="Tìm kiếm thành viên"
        allowClear
        enterButton="Tìm"
        size="middle"
        onSearch={onSearch}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table
        columns={columns}
        dataSource={members}
        rowKey={(record) => record.id || record.phone}
        pagination={{
          current: page + 1,
          pageSize: limit,
          total: total,
          onChange: (pageNumber) => setPage(pageNumber - 1),
          showSizeChanger: false,
        }}
      />
    </div>
  );
}
