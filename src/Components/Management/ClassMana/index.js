import { Row, Col } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { instance } from "../../../apis/instance";


function ClassMana({ reload }) {
  const nav = useNavigate();
  const [classInfo, setClassInfo] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        nav("/login");
      }
      const res = await instance.get("/class", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClassInfo(res.data.data.content);
    };
    fetchData();
  }, [reload]);
  const accessClass = (item) => {
    if(item.id !== 0){
      nav(`/stu/class/${item.classId}`)
    }else {
      nav(`/class/${item.classId}`)
    }
  }
  return (
    <div style={{ padding: "20px", paddingLeft: "40px" }}>
      <Row
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid #e8e8e8",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <Col span={4}>Tên lớp</Col>
        <Col span={4}>Số học sinh</Col>
        <Col span={4}>Số bài kiểm tra</Col>
        <Col span={4}>Bài tập</Col>
        <Col span={4}>Bài giảng</Col>
      </Row>
      {classInfo.map((item) => (
        <Row
          key={item.id}
          onClick={()=>accessClass(item)}
          style={{
            borderBottom: "1px solid #f0f0f0",
            padding: "10px 0",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#f9f9f9")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          <Col span={4}>{item.className}</Col>
          <Col span={4}>{item.countStudent}</Col>
          <Col span={4}>{item.countTest}</Col>
          <Col span={4}>{item.countAssignment}</Col>
          <Col span={4}>{item.countLecture}</Col>
        </Row>
      ))}
    </div>
  );
}

export default ClassMana;
