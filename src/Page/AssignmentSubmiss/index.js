import { useEffect, useState } from "react";
import {
  Flex,
  Typography,
  List,
  Card,
  InputNumber,
  Button,
  Form,
  Input,
} from "antd";
import { useParams } from "react-router-dom";
import { instance } from "../../apis/instance";
const { Title, Text } = Typography;

function AssignmentSubmiss() {
  const { id, assId } = useParams();
  const [submits, setSubmits] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get(`/class/${id}/assignment/${assId}`);
      setSubmits(res.data.data.content);
    };
    fetchData();
  }, []);

  const handleSelect = (submission) => {
    setSelectedSubmission(submission);
    setScore(submission.score);
  };
  const convertToPreviewUrl = (originalUrl) => {
    const match = originalUrl.match(/id=([^&]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return null; // Trường hợp không match
  };

  return (
    <div style={{ height: "100%" }}>
      <Flex
        style={{
          height: "100%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Left Panel - List of submissions */}
        <div
          style={{
            width: "40%",
            padding: "16px",
            borderRight: "1px solid #ddd",
            background: "#f9f9f9",
          }}
        >
          <Title level={4} style={{ marginBottom: "12px" }}>
            Bài nộp
          </Title>
          <List
            dataSource={submits}
            renderItem={(item) => (
              <List.Item
                onClick={() => handleSelect(item)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "6px",
                  transition: "background 0.3s",
                  background:
                    selectedSubmission?.id === item.id
                      ? "#e6f7ff"
                      : "transparent",
                }}
              >
                <Text strong>{item.studentName}</Text>
                <Text type="secondary" style={{ marginLeft: "8px" }}>
                  ({item.submissionTime})
                </Text>
                <Text strong>{item.statusSubmit}</Text>
              </List.Item>
            )}
          />
        </div>

        {/* Right Panel - Submission Details */}
        <div style={{ width: "60%", padding: "16px", background: "#fff" }}>
          {selectedSubmission ? (
            <Card
              title={`Chi tiết bài nộp - ${selectedSubmission.studentName}`}
              style={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: 800,
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <p style={{ margin: "8px 0" }}>
                  <strong>Ngày nộp:</strong> {selectedSubmission.submissionTime}
                </p>
                <p style={{ margin: "8px 0" }}>
                  <strong>Trạng thái:</strong> {selectedSubmission.statusSubmit}
                </p>
                {(selectedSubmission.statusSubmit === "SUBMITTED" ||
                  selectedSubmission.statusSubmit === "CONFIRMED") && (
                  <>
                    <p style={{ margin: "8px 0" }}>
                      <strong>Điểm:</strong> CHƯA CHẤM
                    </p>
                    <div>
                      <p style={{ margin: "8px 0" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <strong>Chấm điểm: </strong>
                          <Input
                            onChange={(e) => {
                              if (/^-?\d+$/.test(e.target.value))
                                setScore(e.target.value)}
                            }
                            style={{ width: "100px" }}
                          />
                          {score ? <Button type="primary">Submit</Button> : <></>}
                        </div>
                      </p>
                    </div>
                  </>
                )}
                {(selectedSubmission.statusSubmit === "SCORED") &&(
                  <>
                    <p style={{ margin: "8px 0" }}>
                      <strong>Điểm:</strong> {selectedSubmission.score}
                    </p>
                    <div>
                      <p style={{ margin: "8px 0" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <strong>Chấm điểm: </strong>
                          <Input
                            onChange={(e) => {
                              if (/^-?\d+$/.test(e.target.value))
                                setScore(e.target.value)}
                            }
                            style={{ width: "100px" }}
                          />
                          {score ? <Button type="primary">Submit</Button> : <></>}
                        </div>
                      </p>
                    </div>
                  </>//
                )}
              </div> 

              {/* Xử lý hiển thị file */}
              {selectedSubmission.submitUrl && (
                <iframe
                  src={convertToPreviewUrl(selectedSubmission.submitUrl)}
                  width="100%"
                  height="400"
                  allow="autoplay"
                  title="Drive File Preview"
                />
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
