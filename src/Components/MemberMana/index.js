import React, { useEffect, useState } from "react";
import Split from "react-split";
import { Card } from "antd";
import { Table, Button, message, List } from "antd";
import { instance } from "../../apis/instance";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

function MemberMana() {
  const token = Cookies.get("token");
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [reload, setReload] = useState(false);
  const [studentPendings, setStudentPendings] = useState([]);
  const handleRemove = async function (memberId) {
    console.log(memberId)
    await instance.delete(
      `/class/${id}/member/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setReload(!reload);
  };
  useEffect(
    function () {
      const fetchData = async () => {
        const res1 = await instance.get(`/class/${id}/member`);
        setMembers(res1.data.data.content);
        const res2 = await instance.get(`/class/${id}/pending`);
        setStudentPendings(res2.data.data);
      };
      fetchData();
    },
    [reload]
  );
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
      render: (_, record) => <Button danger onClick={() => handleRemove(record.id)}>Xóa</Button>,
    },
  ];

  async function handleAproved(id) {
    await instance.put(
      `/class/${id}/member`,
      {},
      {
        params: { classMemberId: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setReload(!reload);
  }

  

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Split
        className="split-container"
        sizes={[70, 30]} // Phần bên trái chiếm 70%, bên phải chiếm 30%
        minSize={100}
        gutterSize={10}
        direction="horizontal" // Chia theo chiều ngang
        style={{ display: "flex", width: "100%" }}
      >
        <div style={{ height: "100%" }}>
          <Card title="Thành viên lớp học" style={{ height: "100%" }}>
            <Table
              columns={columns}
              dataSource={members.map((member) => ({
                ...member, // Chuyển đổi thành viên thành học sinh
                key: member.id, // Thêm khóa cho mỗi dòng
              }))}
              rowKey="key"
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
                      alignItems: "center",
                    }}
                  >
                    {/* Hiển thị tên của sinh viên */}
                    <div>{member.studentName}</div>
                    <div>
                      {/* Nút "Xác nhận" */}
                      <Button
                        type="primary"
                        style={{ marginRight: 10 }}
                        onClick={() => handleAproved(member.id)}
                      >
                        Xác nhận
                      </Button>
                      {/* Nút "Xóa" */}
                      <Button
                        type="danger"
                        onClick={() => handleRemove(member.id)}
                      >
                        Xóa
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
