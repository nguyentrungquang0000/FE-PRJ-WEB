import React, { useEffect, useState } from "react";
import Split from "react-split";
import { Avatar, Card } from "antd";
import { Table, Button, message, List, Input } from "antd";
import { instance } from "../../apis/instance";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserOutlined } from "@ant-design/icons";

function MemberMana() {
  const nav = useNavigate();
  const token = Cookies.get("token");
  const { id } = useParams();

  // Thêm state cho phân trang và tìm kiếm
  const [members, setMembers] = useState([]);
  const [reload, setReload] = useState(false);
  const [studentPendings, setStudentPendings] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const handleRemove = async function (memberId) {
    try {
      await instance.delete(`/class/${id}/member/${memberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReload(!reload);
      message.success("Xóa thành viên thành công");
    } catch (error) {
      if(error.response.status === 403){
        nav(`/error403`);
      }
      if(error.response.status === 401){
        nav(`/`);
      }
      message.error("Xóa thành viên thất bại");
    }
  };

  async function handleAproved(memberId) {
    try {
      await instance.put(
        `/class/${id}/member`,
        {
        },
        {
          params: { classMemberId: memberId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReload(!reload);
      message.success("Xác nhận thành viên thành công");
    } catch (error) {
      message.error("Xác nhận thất bại");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await instance.get(`/class/${id}/member`, {
          params: { keyword, page, limit },
          headers: { Authorization: `Bearer ${token}` },
        });
        setMembers(res1.data.data.content);
        setTotal(res1.data.data.totalElements);

        const res2 = await instance.get(`/class/${id}/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudentPendings(res2.data.data);
      } catch (error) {
        message.error("Lấy dữ liệu thất bại");
      }
    };
    fetchData();
  }, [reload, keyword, page, id, token, nav]);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "studentName",
      key: "fullName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleRemove(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  // Hàm xử lý khi tìm kiếm
  const onSearch = (value) => {
    setKeyword(value);
    setPage(0);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Split
        className="split-container"
        sizes={[70, 30]}
        minSize={100}
        gutterSize={10}
        direction="horizontal"
        style={{ display: "flex", width: "100%" }}
      >
        <div style={{ height: "100%" }}>
          <Card title="Thành viên lớp học" style={{ height: "100%" }}>
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
              dataSource={members.map((member) => ({
                ...member,
                key: member.id,
              }))}
              rowKey="key"
              pagination={{
                current: page + 1,
                pageSize: limit,
                total: total,
                onChange: (pageNumber) => setPage(pageNumber - 1),
                showSizeChanger: false,
              }}
            />
          </Card>
        </div>
        <div style={{ height: "100%" }}>
          <Card title="Chờ duyệt" style={{ height: "100%" }}>
            <List
              dataSource={studentPendings}
              renderItem={(member) => (
                <List.Item key={member.id}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Avatar icon={<UserOutlined />} size={32} />
                      <div style={{ fontWeight: 500 }}>
                        {member.studentName}
                      </div>
                    </div>

                    <div>
                      <Button
                        type="primary"
                        style={{ marginRight: 10 }}
                        onClick={() => handleAproved(member.id)}
                      >
                        Xác nhận
                      </Button>
                      <Button
                        type="danger"
                        style={{ border: "1px solid black" }}
                        onClick={() => handleRemove(member.id)}
                      >
                        Từ chối
                      </Button>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </Split>
    </div>
  );
}

export default MemberMana;
