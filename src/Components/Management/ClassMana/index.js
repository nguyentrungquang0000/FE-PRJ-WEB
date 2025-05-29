import { Row, Col, Input, Button, Pagination } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { instance } from "../../../apis/instance";

function ClassMana({ reload }) {
  const nav = useNavigate();
  const [classInfo, setClassInfo] = React.useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  });
  const [keyword, setKeyword] = useState("");
  const [timeoutId, setTimeoutId] = useState(null); // Để lưu timeout

  const fetchData = async (pageNumber = 1, searchKeyword = "") => {
    const token = Cookies.get("token");
    try {
      const res = await instance.get("/class", {
        params: {
          page: pageNumber - 1, // API dùng index bắt đầu từ 0
          limit: pagination.size,
          keyword: searchKeyword,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.data;
      setClassInfo(data.content);
      setPagination({
        page: data.currentPage + 1, // Chuyển đổi thành số trang bắt đầu từ 1
        size: data.size,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
      });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        Cookies.remove("token");
        nav("/");
      }
    }
  };

  React.useEffect(() => {
    fetchData(pagination.page, keyword);
  }, [reload, pagination.page]);

  const accessClass = (item) => {
    if (item.id !== 0) {
      nav(`/stu/class/${item.classId}`);
    } else {
      nav(`/class/${item.classId}`);
    }
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    
    // Clear timeout nếu có
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set timeout mới với độ trễ 2s
    const newTimeoutId = setTimeout(() => {
      fetchData(1, e.target.value);
    }, 1000);

    // Lưu timeout id để clear nếu cần
    setTimeoutId(newTimeoutId);
  };

  const handleSearchSubmit = () => {
    setPagination({ ...pagination, page: 1 });
    fetchData(1, keyword);
  };

  const handlePageChange = (pageNumber) => {
    setPagination({ ...pagination, page: pageNumber });
  };

  return (
    <div style={{ padding: "20px", paddingLeft: "40px" }}>
      {/* Thanh tìm kiếm nằm ngoài table */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Input
          placeholder="Tìm kiếm lớp học..."
          value={keyword}
          onChange={handleSearch}
          style={{ width: 250 }}
        />
        <Button type="primary" onClick={handleSearchSubmit}>
          Tìm kiếm
        </Button>
      </div>

      {/* Tiêu đề bảng */}
      <Row
        style={{
          fontWeight: "bold",
          borderBottom: "1px solid #e8e8e8",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <Col span={4}>Tên lớp</Col>
        <Col span={4}>Mã lớp học</Col>
        <Col span={4}>Số học sinh</Col>
        <Col span={4}>Số bài kiểm tra</Col>
        <Col span={4}>Bài tập</Col>
        <Col span={4}>Bài giảng</Col>
      </Row>

      {/* Danh sách lớp học */}
      {classInfo.map((item, index) => (
        <Row
          key={index}
          onClick={() => accessClass(item)}
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
          <Col span={4}>{item.classId}</Col>
          <Col span={4}>{item.countStudent}</Col>
          <Col span={4}>{item.countTest}</Col>
          <Col span={4}>{item.countAssignment}</Col>
          <Col span={4}>{item.countLecture}</Col>
        </Row>
      ))}

      {/* Phân trang */}
      <Pagination
        current={pagination.page}
        total={pagination.totalElements}
        pageSize={pagination.size}
        onChange={handlePageChange}
        style={{ textAlign: "center", marginTop: 20 }}
      />
    </div>
  );
}

export default ClassMana;
