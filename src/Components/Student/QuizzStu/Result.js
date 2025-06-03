import { Card, Tag, Descriptions, Button } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { instance } from "../../../apis/instance";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

export function QuizResultChart() {
  const [quiz, setQuiz] = useState({ questions: [] });
  const token = Cookies.get("token");
  const { quizSubmitId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/quizsubmit/${quizSubmitId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuiz(res.data.data);
      } catch (error) {
        if(error.response.status === 403){
          navigate(`/error403`);
        }
      }
    };
    fetchData();
  }, [quizSubmitId, token]);

  return (
    <div style={{ display: "flex", gap: "24px", padding: "24px" }}>
      {/* Cột trái - danh sách câu hỏi */}
      <div style={{ flexBasis: "70%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
          🎯 Kết quả bài kiểm tra
        </h2>
        {quiz.questions.map((question, index) => {
          const isCorrect = question.answer === question.result;
          return (
            <Card
              key={question.questionId}
              style={{
                marginBottom: "20px",
                borderRadius: "12px",
                backgroundColor: isCorrect ? "#f6ffed" : "#fff1f0",
                borderColor: isCorrect ? "#b7eb8f" : "#ffa39e",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
              bodyStyle={{ padding: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <div style={{ fontSize: "18px", fontWeight: "bold", flex: 1 }}>
                  Câu {index + 1}: {question.title}
                </div>
                {isCorrect ? (
                  <CheckCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: "24px" }}
                  />
                ) : (
                  <CloseCircleTwoTone
                    twoToneColor="#f5222d"
                    style={{ fontSize: "24px" }}
                  />
                )}
              </div>
              <p>
                <strong>💬 Câu trả lời của bạn:</strong> {question.answer}
              </p>
              {!isCorrect && (
                <p style={{ color: "#d32029" }}>
                  <strong>✅ Đáp án đúng:</strong> {question.result}
                </p>
              )}
            </Card>
          );
        })}
      </div>

      {/* Cột phải - thông tin bài kiểm tra */}
      <div
        style={{
          flexBasis: "30%",
          position: "sticky",
          top: "24px",
          alignSelf: "flex-start",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div>
          <Card
            title="📄 Thông tin bài kiểm tra"
            style={{
              borderRadius: "12px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              transition: "box-shadow 0.3s ease",
              cursor: "default",
            }}
            bodyStyle={{ padding: "24px" }}
            headStyle={{ fontWeight: "600", fontSize: "18px" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.1)")
            }
          >
            <Descriptions
              column={1}
              layout="vertical"
              colon={false}
              style={{ fontSize: "15px" }}
            >
              <Descriptions.Item label="Tên bài kiểm tra">
                <strong>{quiz.title}</strong>
              </Descriptions.Item>
              <Descriptions.Item label="Người làm bài">
                {quiz.name}
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian nộp">
                {new Date(quiz.submit_time).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Điểm số">
                <Tag
                  color="green"
                  style={{
                    fontSize: "16px",
                    padding: "4px 14px",
                    fontWeight: "600",
                    borderRadius: "12px",
                    userSelect: "none",
                  }}
                >
                  {typeof quiz.score === 'number' ? quiz.score.toFixed(2) : '0.00'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => navigate(-1)} // Quay lại trang trước
            type="default"
            style={{
              backgroundColor: "#ffe58f",
              borderColor: "#faad14",
              color: "#000",
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(250, 173, 20, 0.4)",
              transition: "all 0.25s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#ffd666";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(250, 173, 20, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffe58f";
              e.currentTarget.style.boxShadow =
                "0 2px 8px rgba(250, 173, 20, 0.4)";
            }}
          >
            ← Quay lại
          </Button>
        </div>
      </div>
    </div>
  );
}
