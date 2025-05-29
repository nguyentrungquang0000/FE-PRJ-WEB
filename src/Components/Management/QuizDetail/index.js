import { Button, Card, Descriptions, Modal, Form, Input, DatePicker, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";
import Cookies from 'js-cookie';

export function QuizDetail() {
  const { id, quizId } = useParams();
  const token = Cookies.get('token');

  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const res = await instance.get(`/class/${id}/quiz/${quizId}/detail`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.data;
        setQuiz(data);
        form.setFieldsValue({
          name: data.name,
          description: data.description,
          examTime: data.examTime,
          startTime: data.startTime ? dayjs(data.startTime) : null,
          endTime: data.endTime ? dayjs(data.endTime) : null,
        });
      } catch (err) {
        console.error("Lỗi khi lấy quiz info:", err);
      }
    };

    const fetchQuestions = async () => {
      try {
        const res = await instance.get(`/class/${id}/test/${quizId}/question`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(res.data.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách câu hỏi:", err);
      }
    };

    fetchQuizData();
    fetchQuestions();
  }, [id, quizId, token, loading]);

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        name: values.name,
        description: values.description || "",
        examTime: parseInt(values.examTime),
        startTime: values.startTime ? dayjs(values.startTime).toISOString() : null,
        endTime: values.endTime ? dayjs(values.endTime).toISOString() : null,
      };

      await instance.put(`/quiz/${quizId}/update`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLoading(!loading);
      setIsModalOpen(false);
      message.success("Cập nhật thành công!");
    } catch (err) {
      console.error(err);
      message.error("Cập nhật thất bại!");
    }
  };

  return (
    <div style={{ display: "flex", gap: "24px", padding: "24px", alignItems: "flex-start" }}>
      {/* Left: Danh sách câu hỏi */}
      <div style={{
        flex: 2,
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}>
        <h2 style={{ color: "#1890ff", marginBottom: 16 }}>📚 Danh sách câu hỏi</h2>
        {questions.map(q => (
          <Card key={q.id} style={{ marginBottom: 12 }}>
            <strong>{q.title}</strong>
            <p style={{ color: "#666" }}>Kết quả đúng: {q.result}</p>
          </Card>
        ))}
      </div>

      {/* Right: Thông tin bài kiểm tra */}
      <div style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}>
        <Descriptions title="📝 Thông tin bài kiểm tra" bordered column={1}>
          <Descriptions.Item label="Tên">{quiz.name}</Descriptions.Item>
          <Descriptions.Item label="Mô tả">{quiz.description}</Descriptions.Item>
          <Descriptions.Item label="Thời gian làm bài">{quiz.examTime} phút</Descriptions.Item>
          <Descriptions.Item label="Bắt đầu">{quiz.startTime ? new Date(quiz.startTime).toLocaleString() : "—"}</Descriptions.Item>
          <Descriptions.Item label="Kết thúc">{quiz.endTime ? new Date(quiz.endTime).toLocaleString() : "—"}</Descriptions.Item>
        </Descriptions>

        <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginTop: 20 }}>
          Đổi thông tin
        </Button>
      </div>

      {/* Modal chỉnh sửa */}
      <Modal
        title="Chỉnh sửa bài kiểm tra"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleEditSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên bài kiểm tra"
            rules={[{ required: true, message: "Nhập tên bài kiểm tra" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Nhập mô tả" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="examTime"
            label="Thời gian làm bài (phút)"
            rules={[{ required: true, message: "Nhập thời gian làm bài" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="startTime"
            label="Bắt đầu"
            rules={[{ required: true, message: "Chọn thời gian bắt đầu" }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>

          <Form.Item
            name="endTime"
            label="Kết thúc"
            rules={[{ required: true, message: "Chọn thời gian kết thúc" }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
