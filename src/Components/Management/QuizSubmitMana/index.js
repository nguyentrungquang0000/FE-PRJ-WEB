import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { instance } from "../../../apis/instance";
import {
  Card,
  Typography,
  Spin,
  Pagination,
  Input,
  Button,
  Row,
  Col,
} from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export function QuizSubmitMana() {
  const [submits, setSubmits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const pageSize = 10;
  const nav = useNavigate();

  const { id, quizId } = useParams();
  const token = Cookies.get("token");

  const fetchData = async (currentPage, keywordFilter) => {
    setLoading(true);
    try {
      const res = await instance.get(`/class/${id}/test/${quizId}/submit`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          keyword: keywordFilter,
          page: currentPage - 1,
          limit: pageSize,
        },
      });
      setSubmits(res.data.data.content);
      setTotalItems(res.data.data.totalElements);
    } catch (error) {
      if(error.response.status === 403){
        nav(`/error403`);
      }
      if(error.response.status === 401){
        nav(`/`);
      }
      console.error("Lỗi khi lấy dữ liệu bài nộp:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, keyword);
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchData(1, keyword);
  };

  return (
    <div
      style={{
        padding: 24,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Danh sách bài nộp
        </Title>
        <Input.Search
          placeholder="Tìm theo tên học sinh"
          enterButton="Tìm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch}
          style={{ maxWidth: 300 }}
        />
      </div>

      {loading ? (
        <Spin />
      ) : submits.length === 0 ? (
        <Text>Không có bài nộp nào.</Text>
      ) : (
        <div>
          {submits.map((submit) => (
            <Card
              key={submit.id}
              hoverable
              style={{
                borderLeft: "5px solid #1890ff",
                backgroundColor: "#ffffff",
                marginBottom: 16,
              }}
              bodyStyle={{ padding: 16 }}
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <p>
                    <Text strong>Tên học sinh:</Text> {submit.studentName}
                  </p>
                  <p>
                    <Text strong>Điểm:</Text> {submit.score.toFixed(2)}
                  </p>
                  <p>
                    <Text strong>Thời gian nộp:</Text>{" "}
                    {dayjs(submit.submissionTime).format(
                      "HH:mm:ss DD/MM/YYYY"
                    )}
                  </p>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#52c41a",
                      borderColor: "#52c41a",
                      color: "#fff",
                    }}
                    onClick={()=>{nav(`/class/${id}/quizz-stu/${quizId}/result/${submit.id}`)}}
                  >
                    Xem bài làm
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      )}

      <div
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "#f9f9f9",
          padding: "16px 0",
          display: "flex",
          justifyContent: "center",
          marginTop: 24,
          borderTop: "1px solid #ddd",
        }}
      >
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalItems}
          onChange={(newPage) => setPage(newPage)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
