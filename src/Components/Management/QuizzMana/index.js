import { useState } from "react";
import { InputNumber, DatePicker, Form, Input, Modal, Button, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const quizzes = [
  {
    id: "quiz_001",
    title: "JavaScript Basics",
    description: "Test your knowledge about JavaScript fundamentals.",
    total_questions: 10,
    duration: 15,
    created_by: "admin",
    created_at: "2025-03-12T08:00:00Z",
    due_date: "2025-03-20T23:59:59Z"
  },
  {
    id: "quiz_002",
    title: "Spring Boot Introduction",
    description: "A beginner-friendly quiz on Spring Boot.",
    total_questions: 12,
    duration: 20,
    created_by: "teacher_01",
    created_at: "2025-03-10T10:30:00Z",
    due_date: "2025-03-18T23:59:59Z"
  },
  {
    id: "quiz_003",
    title: "ReactJS Essentials",
    description: "Covering components, state, and hooks.",
    total_questions: 15,
    duration: 25,
    created_by: "teacher_02",
    created_at: "2025-03-11T09:15:00Z",
    due_date: "2025-03-22T23:59:59Z"
  }
];

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Due Date",
    dataIndex: "due_date",
    key: "due_date",
    render: (text) => new Date(text).toLocaleDateString(),
  }
];

export function QuizzMana(){
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("Quiz Data:", values);
    // Truyền dữ liệu form sang CreateQuizz qua state
    navigate('/quizz-crea', { state: { quizData: values } });
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent : 'space-between', alignItems :'center'}}>
        <h2>Danh sách bài tập</h2>
        <div>
          <Button type="primary" onClick={showModal}>
            Tạo bài Quizz
          </Button>
          <Modal title="Tạo bài Quizz" footer={null} open={isModalOpen} onCancel={handleCancel}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                label="Tên bài Quizz"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên bài quizz!" }]}>
                <Input placeholder="Nhập tên bài quizz" />
              </Form.Item>

              <Form.Item
                label="Thời gian làm bài (phút)"
                name="duration"
                rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}>
                <InputNumber min={1} max={180} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Số câu hỏi"
                name="questionCount"
                rules={[{ required: true, message: "Vui lòng nhập số câu hỏi!" }]}>
                <InputNumber min={1} max={100} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Ngày bắt đầu"
                name="dateStart"
                rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}>
                <DatePicker showTime style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Ngày kết thúc"
                name="dateDue"
                rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}>
                <DatePicker showTime style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Tạo bài Quizz
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>

      <div>
        <Table
          dataSource={quizzes}
          columns={columns}
          rowKey="id"
          expandable={{
            expandedRowRender: (record) => (
              <>
                <p><strong>Description:</strong> {record.description}</p>
                <p><strong>Questions:</strong> {record.total_questions}</p>
                <p><strong>Duration:</strong> {record.duration} minutes</p>
                <p>
                  <strong>Created By:</strong> <Tag color={record.created_by === "admin" ? "red" : "blue"}>{record.created_by}</Tag>
                </p>
                <p><strong>Created At:</strong> {new Date(record.created_at).toLocaleDateString()}</p>
              </>
            ),
            expandRowByClick: true,
            showExpandColumn: false,
          }}
        />
      </div>
    </div>
  );
}
