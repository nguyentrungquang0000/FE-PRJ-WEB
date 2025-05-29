import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Card,
  Pagination,
  Empty,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";
import Cookies from "js-cookie";
import { SearchOutlined } from "@ant-design/icons";

export function AssignmentStudent() {
  const nav = useNavigate();
  const token = Cookies.get("token");
  const { id } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1); // trang bắt đầu từ 1
  const [total, setTotal] = useState(0);
  const pageSize = 5;

  const fetchData = async (search = keyword, pageNumber = page) => {
    try {
      const res = await instance.get(`/class/${id}/assignment`, {
        params: {
          keyword: search,
          page: pageNumber - 1, // backend từ 0
          limit: pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignments(res.data.data.content);
      setTotal(res.data.data.totalElements);
    } catch (error) {
      if(error.response){
        const status = error.response.status;
        if(status === 403){
          nav(`/error403`);
        }
      }

      console.error("Lỗi khi tải bài tập:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearch = (value) => {
    setKeyword(value);
    setPage(1); // quay lại trang đầu khi tìm kiếm
    fetchData(value, 1);
  };

  const handleAssDetail = (assignment) => {
    nav(`/stu/class/${id}/ass-stu/${assignment.id}`);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "90%", margin: "0 auto" }}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Tìm bài tập..."
          allowClear
          onPressEnter={(e) => handleSearch(e.target.value)}
          onChange={(e) => setKeyword(e.target.value)}
          onBlur={(e) => handleSearch(e.target.value)}
          style={{ width: "300px" }}
          suffix={<SearchOutlined />}
        />
      </div>

      {assignments.length === 0 ? (
        <Empty description="Không có bài tập" />
      ) : (
        <>
          {assignments.map((assignment) => (
            <Card
              key={assignment.id}
              style={{
                width: "100%",
                margin: "1rem auto",
                border: "1px solid #f0f0f0",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
              }}
              bodyStyle={{ padding: "1.5rem" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h3 style={{ margin: 0, marginBottom: "0.5rem" }}>
                    {assignment.title}
                  </h3>
                  <div
                    style={{
                      color: "#888",
                      fontSize: "0.9rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Ngày tạo:{" "}
                    {new Date(assignment.createdDate).toLocaleString()}
                  </div>
                  <div style={{ color: "#888", fontSize: "0.9rem" }}>
                    Hạn nộp: {new Date(assignment.dueDate).toLocaleString()}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "0.5rem",
                  }}
                >
                  <Button
                    type="primary"
                    size="small"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "green",
                      fontWeight: "500",
                      padding: "0 12px",
                    }}
                    onClick={() => handleAssDetail(assignment)}
                  >
                    Làm bài tập
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={(p) => setPage(p)}
            style={{ textAlign: "center", marginTop: "20px" }}
            showSizeChanger={false}
          />
        </>
      )}
    </div>
  );
}
