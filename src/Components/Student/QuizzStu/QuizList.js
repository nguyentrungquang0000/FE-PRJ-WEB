import { Button, Card, Modal, Input, Pagination, Empty } from "antd";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";
import { SearchOutlined } from "@ant-design/icons";

export function QuizList() {
  const token = Cookies.get("token");
  const { id } = useParams();
  const nav = useNavigate();

  const [quizs, setQuizs] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("NO_SUBMIT");
  const [quizSubmitId, setQuizSubmitId] = useState();

  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 5;

  // Fetch danh sách quiz theo keyword & page
  const fetchQuizs = async (search = keyword, pageNumber = page) => {
    try {
      const res = await instance.get(`/class/${id}/test`, {
        params: {
          keyword: search,
          page: pageNumber - 1,
          limit: pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuizs(res.data.data.content);
      setTotal(res.data.data.totalElements);
    } catch (error) {
      if(error.response.status === 403){
        nav(`/error403`);
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuizs();
  }, [page]);

  const handleSearch = (value) => {
    setKeyword(value);
    setPage(1);
    fetchQuizs(value, 1);
  };

  const showModal = (quiz) => {
    setSelectedQuiz(quiz);
    const fetchStatus = async () => {
      try {
        const res = await instance.get(`/get_status_quiz/${quiz.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubmitStatus(res.data.data);
        setQuizSubmitId(res.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatus();
    setModalVisible(true);
  };

  const handleStartTest = (quizId) => {
    const startTest = async () => {
      try {
        await instance.post(
          `/class/${id}/quiz/${quizId}/start`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        nav(`/stu/class/${id}/quizz-stu/${quizId}/quiz`);
      } catch (error) {
        console.log(error);
      }
    };
    startTest();
  };

  const handleContinueTest = (quizId) => {
    nav(`/stu/class/${id}/quizz-stu/${quizId}/quiz`);
  };

  const handleClose = () => {
    setModalVisible(false);
    setSelectedQuiz(null);
  };

  const handleResult = () => {
    nav(`/stu/class/${id}/quizz-stu/0/result/${quizSubmitId}`);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Input
          placeholder="Tìm bài thi..."
          allowClear
          onPressEnter={(e) => handleSearch(e.target.value)}
          onChange={(e) => setKeyword(e.target.value)}
          onBlur={(e) => handleSearch(e.target.value)}
          style={{ width: "300px" }}
          suffix={<SearchOutlined />}
        />
      </div>

      {quizs.length === 0 ? (
        <Empty description="Không có bài thi" />
      ) : (
        <>
          {quizs.map((quiz, index) => (
            <Card
              key={quiz.id || index}
              style={{
                width: "100%",
                margin: "1rem auto",
                border: "1px solid #f0f0f0",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
                cursor: "pointer",
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
                  <h3 style={{ margin: 0, marginBottom: "0.5rem" }}>{quiz.name}</h3>
                  <div
                    style={{
                      color: "#888",
                      fontSize: "0.9rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Bắt đầu: {new Date(quiz.startTime).toLocaleString()}
                  </div>
                  <div style={{ color: "#888", fontSize: "0.9rem" }}>
                    Kết thúc: {new Date(quiz.endTime).toLocaleString()}
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
                      backgroundColor: "#1677ff",
                      fontWeight: "500",
                      padding: "0 12px",
                    }}
                  >
                    {quiz.countQuestion} câu hỏi
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "green",
                      fontWeight: "500",
                      padding: "0 12px",
                    }}
                    onClick={() => showModal(quiz)}
                  >
                    Làm bài thi
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

      {/* Modal hiển thị thông tin bài thi */}
      <Modal
        open={modalVisible}
        onCancel={handleClose}
        onOk={handleClose}
        footer={false}
        title={selectedQuiz?.name}
      >
        {selectedQuiz && (
          <>
            <div style={{ fontSize: "14px", lineHeight: 1.6 }}>
              <p>
                <strong>Số câu hỏi:</strong> {selectedQuiz.countQuestion}
              </p>
              <p>
                <strong>Ngày tạo:</strong>{" "}
                {new Date(selectedQuiz.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Hạn nộp:</strong>{" "}
                {new Date(selectedQuiz.endTime).toLocaleString()}
              </p>
              <p>
                <strong>Mô tả:</strong> {selectedQuiz.description || "Không có mô tả."}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {submitStatus === "SUBMITTED" && (
                <Button type="primary" onClick={handleResult}>
                  Xem kết quả
                </Button>
              )}
              {submitStatus === "SUBMITTING" && (
                <Button
                  type="primary"
                  onClick={() => handleContinueTest(selectedQuiz.id)}
                >
                  Tiếp tục bài thi
                </Button>
              )}
              {submitStatus === "NO_SUBMIT" &&
                (new Date(selectedQuiz.startTime) < new Date() &&
                new Date() < new Date(selectedQuiz.endTime) ? (
                  <Button
                    type="primary"
                    onClick={() => handleStartTest(selectedQuiz.id)}
                  >
                    Bắt đầu bài thi
                  </Button>
                ) : (
                  <Button type="primary" disabled>
                    Ngoài thời gian thi
                  </Button>
                ))}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
