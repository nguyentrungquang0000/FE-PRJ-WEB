import React from "react";
import Split from "react-split";
import { Card } from "antd";
import { Table, Button, message, List } from 'antd';
const members=[
  {
    "id": 1,
    "status": "ACTIVE",
    "classroom": {
      "id": 1,
      "name": "Class 1",
      "teacher": "Teacher A"
    },
    "student": {
      "id": 1,
      "fullName": "Student 1",
      "email": "student1@example.com"
    }
  },
  {
    "id": 2,
    "status": "ACTIVE",
    "classroom": {
      "id": 1,
      "name": "Class 1",
      "teacher": "Teacher A"
    },
    "student": {
      "id": 2,
      "fullName": "Student 2",
      "email": "student2@example.com"
    }
  },
  {
    "id": 3,
    "status": "INACTIVE",
    "classroom": {
      "id": 1,
      "name": "Class 1",
      "teacher": "Teacher A"
    },
    "student": {
      "id": 3,
      "fullName": "Student 3",
      "email": "student3@example.com"
    }
  },
  {
    "id": 4,
    "status": "ACTIVE",
    "classroom": {
      "id": 1,
      "name": "Class 1",
      "teacher": "Teacher A"
    },
    "student": {
      "id": 4,
      "fullName": "Student 4",
      "email": "student4@example.com"
    }
  },
  {
    "id": 5,
    "status": "ACTIVE",
    "classroom": {
      "id": 1,
      "name": "Class 1",
      "teacher": "Teacher A"
    },
    "student": {
      "id": 5,
      "fullName": "Student 5",
      "email": "student5@example.com"
    }
  },
  {
    "id": 6,
    "status": "INACTIVE",
    "classroom": {
      "id": 1,
      "name": "Class 1",
      "teacher": "Teacher A"
    },
    "student": {
      "id": 6,
      "fullName": "Student 6",
      "email": "student6@example.com"
    }
  },
  {
    "id": 7,
    "status": "ACTIVE",
    "classroom": {
      "id": 1,
      "name": "Class 1",
      "teacher": "Teacher A"
    },
    "student": {
      "id": 7,
      "fullName": "Student 7",
      "email": "student7@example.com"
    }
  },
  {
    "id": 8,
    "status": "ACTIVE",
    "classroom": {
      "id": 1,
      "name": "Class 1",
      "teacher": "Teacher A"
    },
    "student": {
      "id": 8,
      "fullName": "Student 8",
      "email": "student8@example.com"
    }
  },
  {
    "id": 9,
    "status": "INACTIVE",
    "classroom": {
      "id": 1,
      "name": "Class 1",
      "teacher": "Teacher A"
    },
    "student": {
      "id": 9,
      "fullName": "Student 9",
      "email": "student9@example.com"
    }
  },
  {
    "id": 10,
    "status": "ACTIVE",
    "classroom": {
      "id": 1,
      "name": "Class 1",
      "teacher": "Teacher A"
    },
    "student": {
      "id": 10,
      "fullName": "Student 10",
      "email": "student10@example.com"
    }
  }
]

function MemberMana() {
  const activeMembers = members.filter((member) => member.status === "ACTIVE");
  const inactiveMembers = members.filter((member) => member.status === "INACTIVE");

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Button
          danger
        >
          Xóa
        </Button>
      ),
    },
  ];
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
              dataSource={activeMembers.map((member) => ({
                ...member.student, // Chuyển đổi thành viên thành học sinh
                key: member.id, // Thêm khóa cho mỗi dòng
              }))}
              rowKey="key"
            />
          </Card>
        </div>
        <div style={{ height: "100%" }}>
          <Card title="Chờ duyệt" style={{ height: "100%" }}>
            <List
              dataSource={inactiveMembers}
              renderItem={(member) => (
                <List.Item key={member.id}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Hiển thị tên của sinh viên */}
                    <div>{member.student.fullName}</div>
                    <div>
                      {/* Nút "Xác nhận" */}
                      <Button type="primary" style={{ marginRight: 10 }}>
                        Xác nhận
                      </Button>
                      {/* Nút "Xóa" */}
                      <Button type="danger">
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
