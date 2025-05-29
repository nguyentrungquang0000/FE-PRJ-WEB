// src/Page/CreateQuizz/index.jsx

import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { instance } from "../../apis/instance";
import Cookies from 'js-cookie';

export function CreateQuizz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { quizData } = location.state || {};
  const token = Cookies.get('token');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [form] = Form.useForm();

  const handleQuestionClick = (index) => {
    if (!questions[selectedQuestion]) {
      const updated = [...questions];
      updated[selectedQuestion] = { question: "", option: "" };
      setQuestions(updated);
    }
    setSelectedQuestion(index);
    form.resetFields();
    if (questions[index]) {
      form.setFieldsValue({
        question: questions[index].question,
        option: questions[index].option,
      });
    }
  };

  const handleFinish = (values) => {
    const newQuestion = { question: values.question, option: values.option };
    const updated = [...questions];
    updated[selectedQuestion] = newQuestion;
    setQuestions(updated);
    if (!completedQuestions.includes(selectedQuestion)) {
      setCompletedQuestions([...completedQuestions, selectedQuestion]);
    }
    message.success("Câu hỏi đã được lưu!");
  };

  const handleComplete = async () => {
    if (questions.length < quizData.countQuestion || questions.some(q => !q?.question || !q?.option)) {
      message.error("Vui lòng hoàn thành tất cả các câu hỏi!");
      return;
    }

    const payload = {
      ...quizData,
      questions: questions.map(q => ({
        title: q.question,
        result: q.option,
      }))
    };

    try {
      await instance.post(`/class/${id}/test`, payload, {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      message.success("Tạo bài quizz thành công!");
      navigate(`/class/${id}/quizz-mana`);
    } catch (err) {
      console.error(err);
      message.error("Tạo bài quizz thất bại!");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", padding: "20px", borderRight: "1px solid #ddd" }}>
        <h3>Các câu hỏi</h3>
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}>
          {Array.from({ length: quizData.countQuestion }).map((_, index) => (
            <Button
              key={index}
              style={{
                width: "50px",
                height: "50px",
                margin: "5px",
                fontSize: "14px",
                padding: "0",
                backgroundColor: completedQuestions.includes(index) ? "#4CAF50" : "#f0f0f0",
                color: completedQuestions.includes(index) ? "white" : "black",
                border: completedQuestions.includes(index) ? "2px solid #4CAF50" : "1px solid #ddd",
              }}
              onClick={() => handleQuestionClick(index)}
            >
              Câu {index + 1}
            </Button>
          ))}
        </div>
        <Button type="dashed" onClick={handleComplete} style={{ width: "100%", marginTop: "10px" }}>
          Hoàn thành
        </Button>
      </div>

      <div style={{ width: "70%", padding: "20px" }}>
        <h3>Thông tin câu hỏi</h3>
        {selectedQuestion !== null && (
          <div style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "bold" }}>
            Câu {selectedQuestion + 1}
          </div>
        )}

        {selectedQuestion !== null && (
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Đề bài"
              name="question"
              rules={[{ required: true, message: "Vui lòng nhập đề bài!" }]}
            >
              <Input.TextArea rows={4} placeholder="Nhập câu hỏi" />
            </Form.Item>
            <Form.Item
              label="Đáp án"
              name="option"
              rules={[{ required: true, message: "Vui lòng nhập đáp án!" }]}
            >
              <Input placeholder="Nhập đáp án" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Lưu câu hỏi
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}
