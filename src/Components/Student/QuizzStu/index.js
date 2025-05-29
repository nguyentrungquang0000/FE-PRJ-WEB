import React, { useState, useEffect } from "react";
import { Divider, Input, Card, Button, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";
import Cookies from 'js-cookie';

export function 
QuizStu() {
  const nav = useNavigate();
  const token = Cookies.get('token');
  const { id, quizId } = useParams();

  const [data, setData] = useState({});
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [score, setScore] = useState(null); // ví dụ bạn muốn hiển thị điểm


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/quizzing/${quizId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const fetchedData = res.data.data;
        setData(fetchedData);
        setAnswers(fetchedData.questions.map((q) => q.answer || ""));

        // Thiết lập thời gian
        const startTime = new Date(fetchedData.startTime);
        const examDuration = fetchedData.examTime * 60 * 1000;
        const endTime = startTime.getTime() + examDuration;

        // Bắt đầu đếm ngược
        const timer = setInterval(() => {
          const now = new Date().getTime();
          const remaining = endTime - now;
          if (remaining <= 0) {
            clearInterval(timer);
            setIsTimeUp(true);
            setTimeLeft(0);
          } else {
            setTimeLeft(remaining);
          }
        }, 1000);

        return () => clearInterval(timer);
      } catch (error) {
        
        console.log(error);
      }
    };

    fetchData();
  }, [quizId, token]);

  const handleSubmit = () => {
    const fetchData = async()=>{
      try{
        const res = await instance.post(`/submit_quiz/${quizId}`, {}, {
          headers:{
            Authorization:  `Bearer ${token}`,
          }
        });
        setScore(res.data.data);
        setShowResultModal(true);
      }catch(error){
        console.log("Lỗi nộp bài: ", error);
      }
    }
    fetchData();
  }

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        alignItems: "flex-start",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      {/* Cột trái: 70% */}
      <div style={{ flexBasis: "70%" }}>
        <h3 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          🎯 Bài kiểm tra trắc nghiệm
        </h3>

        {data.questions && data.questions.map((question, index) => (
          <Card
            key={question.questionId}
            style={{
              marginBottom: "1rem",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            bodyStyle={{ padding: "1.5rem" }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                marginBottom: "1rem",
              }}
            >
              Câu {index + 1}: {question.title}
            </div>

            <Input
              value={answers[index]}
              onChange={async (e) => {
                const newAnswers = [...answers];
                newAnswers[index] = e.target.value;
                setAnswers(newAnswers);
              
                try {
                  await instance.put(
                    `/class/${id}/quiz/${quizId}/update_answer`,
                    {
                      questionId: question.questionId,
                      answer: e.target.value,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                } catch (error) {
                  console.error("Lỗi khi cập nhật đáp án:", error);
                }
              }}
              
              placeholder="Nhập câu trả lời của bạn..."
              style={{
                marginBottom: "1rem",
                borderRadius: "8px",
                height: "3rem",
                fontSize: "1rem",
              }}
            />

            <Divider style={{ margin: "1.5rem 0" }} />
          </Card>
        ))}
      </div>

      {/* Cột phải: 30% */}
      <div
        style={{
          flexBasis: "25%",
          padding: "1rem",
          borderRadius: "12px",
          backgroundColor: "#fafafa",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          position: "sticky",
          top: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "400px",
        }}
      >
        <div>
          <h4 style={{ textAlign: "center", marginBottom: "1rem" }}>📋 Thời gian</h4>
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {isTimeUp ? "Hết thời gian" : formatTime(timeLeft)}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.75rem",
              justifyItems: "center",
              marginBottom: "1rem",
            }}
          >
            {answers.map((ans, idx) => (
              <div
                key={idx}
                title={`Câu ${idx + 1}`}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "5px",
                  backgroundColor: ans.trim() ? "#52c41a" : "#d9d9d9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: "#fff",
                  cursor: "default",
                  transition: "all 0.2s",
                }}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={handleSubmit}
          style={{ width: "100%", marginTop: "1rem" }}
          disabled={isTimeUp}
        >
          Nộp bài
        </Button>

        <Modal
          open={showResultModal}
          title="🎉 Kết quả bài làm"
          footer={null} // Không có nút OK/Cancel ở dưới
          closable={false} // Không hiển thị nút X
          maskClosable={false} // Click ra ngoài không đóng modal
        >
          {score !== null ? (
            <p style={{ fontSize: "1.2rem" }}>
              Bạn đã đạt được <b>{score}</b> điểm.
            </p>
          ) : (
            <p>Không thể lấy điểm. Vui lòng thử lại sau.</p>
          )}
          <div
            onClick={() => nav(`/stu/class/${id}/quizz-stu`)}
            style={{
              marginTop: "20px",
              textAlign: "center",
              cursor: "pointer",
              color: "#1890ff",
              fontWeight: "bold"
            }}
          >
            Trở về bài test
          </div>
        </Modal>


      </div>
    </div>
  );
}
