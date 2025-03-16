import { useState } from "react";
import { Flex, Typography, List, Card, InputNumber, Button } from "antd";
import Header from "../../Components/Header";

const { Title, Text } = Typography;

const submissions = [
  { id: 1, student: "Nguyễn Văn A", date: "2025-03-10", status: "PENDING", score: null, url: "" },
  { id: 2, student: "Trần Thị B", date: "2025-03-11", status: "SUBMITTED", score: null, url: "" },
  { id: 3, student: "Lê Văn C", date: "2025-03-12", status: "GRADED", score: 92, url: "https://drive.google.com/file/d/1example/view" },
  { id: 4, student: "Phạm Thị D", date: "2025-03-13", status: "SUBMITTED", score: null, url: "" },
  { id: 5, student: "Hoàng Văn E", date: "2025-03-14", status: "GRADED", score: 88, url: "https://drive.google.com/file/d/2example/view" },
];

function AssignmentSubmiss() {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [score, setScore] = useState(null);

  const handleSelect = (submission) => {
    setSelectedSubmission(submission);
    setScore(submission.score);
  };

  const handleScoreChange = (value) => {
    setScore(value);
  };

  const handleSaveScore = () => {
    console.log("Saving score:", score);
    setSelectedSubmission((prev) => ({ ...prev, score }));
  };

  return (
    <div>
      <div>
        <Header/>
      </div>
    
    <Flex style={{ height: "400px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", borderRadius: "8px", overflow: "hidden" }}>
      {/* Left Panel - List of submissions */}
      <div style={{ width: "40%", padding: "16px", borderRight: "1px solid #ddd", background: "#f9f9f9" }}>
        <Title level={4} style={{ marginBottom: "12px" }}>Bài nộp</Title>
        <List
          dataSource={submissions}
          renderItem={(item) => (
            <List.Item 
              onClick={() => handleSelect(item)} 
              style={{ cursor: "pointer", padding: "10px", borderRadius: "6px", transition: "background 0.3s", background: selectedSubmission?.id === item.id ? "#e6f7ff" : "transparent" }}
            >
              <Text strong>{item.student}</Text>
              <Text type="secondary" style={{ marginLeft: "8px" }}>({item.date})</Text>
            </List.Item>
          )}
        />
      </div>

      {/* Right Panel - Submission Details */}
      <div style={{ width: "60%", padding: "16px", background: "#fff" }}>
        {selectedSubmission ? (
          <Card title={`Chi tiết bài nộp - ${selectedSubmission.student}`} style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
            <p><strong>Ngày nộp:</strong> {selectedSubmission.date}</p>
            <p><strong>Trạng thái:</strong> {selectedSubmission.status}</p>

            {selectedSubmission.status === "GRADED" ? (
              <>
                <p><strong>Điểm:</strong> {selectedSubmission.score}</p>
                <p>
                  <strong>File nộp:</strong> 
                  <a href={selectedSubmission.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "5px", color: "#1890ff" }}>Xem bài nộp</a>
                </p>
              </>
            ) : (
              <div>
                <Text strong>Nhập điểm:</Text>
                <InputNumber
                  min={0}
                  max={100}
                  value={score}
                  onChange={handleScoreChange}
                  style={{ width: "100%", marginTop: 8 }}
                />
                <Button type="primary" onClick={handleSaveScore} style={{ marginTop: 8, width: "100%" }}>
                  Lưu điểm
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <Text type="secondary">Chọn một bài nộp để xem chi tiết.</Text>
        )}
      </div>
    </Flex>
    </div>
  );
}

export default AssignmentSubmiss;