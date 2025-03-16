import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Form, Input, message } from "antd";

export function CreateQuizz() {
  // Lấy quizData từ location state
  const location = useLocation();
  const { quizData } = location.state || {}; // Đảm bảo rằng quizData tồn tại trong state

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questions, setQuestions] = useState([]); // Mảng câu hỏi được lưu lại khi người dùng nhập
  const [completedQuestions, setCompletedQuestions] = useState([]); // Mảng câu hỏi đã hoàn thành

  const [form] = Form.useForm();

  // Khi người dùng chọn một câu hỏi, chúng ta sẽ lưu câu hỏi đã chọn
  const handleQuestionClick = (index) => {
    // Kiểm tra xem câu hỏi đã được lưu chưa, nếu chưa thì khởi tạo
    if (!questions[selectedQuestion]) {
      setQuestions([
        ...questions,
        {
          question: "",
          option: "", // Đổi từ options sang option cho câu hỏi đơn
        },
      ]);
    }
    setSelectedQuestion(index);
    form.resetFields(); // Reset form khi người dùng chọn câu hỏi mới

    // Nếu câu hỏi đã được nhập, điền lại dữ liệu từ questions vào form
    if (questions[index]) {
      const questionData = questions[index];
      form.setFieldsValue({
        question: questionData.question,
        option: questionData.option, // Sử dụng 'option' thay vì 'options'
      });
    }
  };

  // Khi người dùng submit form câu hỏi
  const handleFinish = (values) => {
    const newQuestion = {
      question: values.question, // Đề bài
      option: values.option, // Đáp án duy nhất
    };

    // Cập nhật câu hỏi đã được tạo vào mảng câu hỏi
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestion] = newQuestion;
    setQuestions(updatedQuestions);

    // Thay đổi màu button câu hỏi đã được lưu
    setCompletedQuestions((prev) => [...prev, selectedQuestion]);

    // Hiển thị thông báo khi lưu câu hỏi
    message.success("Câu hỏi đã được lưu!");
  };

  // In ra tất cả đáp án và bỏ checkbox
  const handleComplete = () => {
    // Kiểm tra tất cả các câu hỏi đã được hoàn thành chưa
    const incompleteQuestions = questions.filter(
      (question) => !question.question || !question.option
    );

    if (incompleteQuestions.length > 0) {
      message.error("Vui lòng hoàn thành tất cả các câu hỏi trước khi hoàn thành!");
      return; // Dừng lại nếu có câu hỏi chưa đầy đủ
    }

    // In ra tất cả các câu hỏi đã lưu
    console.log("Tất cả các đáp án đã lưu:", questions);

    // Bỏ tất cả các checkbox
    form.resetFields();
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", padding: "20px", borderRight: "1px solid #ddd" }}>
        <h3>Các câu hỏi</h3>
        {/* Tạo danh sách các nút cho câu hỏi */}
        <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}>
          {Array.from({ length: quizData.questionCount }).map((_, index) => (
            <Button
              key={index}
              style={{
                width: "50px", // Điều chỉnh chiều rộng của nút để nó nhỏ gọn
                height: "50px", // Điều chỉnh chiều cao của nút
                margin: "5px", // Khoảng cách giữa các nút
                fontSize: "14px", // Giảm kích thước font cho chữ trong nút
                padding: "0", // Loại bỏ padding thừa
                backgroundColor: completedQuestions.includes(index) ? "#4CAF50" : "#f0f0f0", // Màu nền khi chọn
                color: completedQuestions.includes(index) ? "white" : "black", // Màu chữ khi chọn
                border: completedQuestions.includes(index) ? "2px solid #4CAF50" : "1px solid #ddd", // Đổi viền khi chọn
              }}
              onClick={() => handleQuestionClick(index)}
            >
              Câu {index + 1}
            </Button>
          ))}
        </div>

        {/* Nút hoàn thành (Được căn trái) */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Button
            type="dashed"
            onClick={handleComplete}
            style={{
              width: "100%",
              marginTop: "10px", // Khoảng cách phía trên nút hoàn thành
              fontSize: "14px", // Kích thước font nhỏ hơn
            }}
          >
            Hoàn thành
          </Button>
        </div>
      </div>

      <div style={{ width: "70%", padding: "20px" }}>
        <h3>Thông tin câu hỏi</h3>

        {/* Hiển thị số câu bên cạnh phần "Thông tin câu hỏi" */}
        {selectedQuestion !== null && (
          <div style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "bold" }}>
            Câu {selectedQuestion + 1}
          </div>
        )}

        {/* Chỉ hiển thị form khi câu hỏi đã được chọn */}
        {selectedQuestion !== null && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              option: "", // Mặc định đáp án trống
            }}
          >
            {/* Câu hỏi (Đề bài) */}
            <Form.Item
              label="Đề bài"
              name="question"
              rules={[{ required: true, message: "Vui lòng nhập đề bài!" }]}
            >
              <Input.TextArea rows={4} placeholder="Nhập câu hỏi" />
            </Form.Item>

            {/* Đáp án */}
            <Form.Item
              label="Đáp án"
              name="option"
              rules={[{ required: true, message: "Vui lòng nhập đáp án!" }]}
            >
              <Input placeholder="Nhập đáp án" />
            </Form.Item>

            {/* Nút lưu câu hỏi */}
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
