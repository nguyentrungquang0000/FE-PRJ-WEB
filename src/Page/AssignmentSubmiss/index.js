import { useEffect, useState } from "react";
import {Flex,Typography,List,Card,InputNumber,Button,message,} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../apis/instance";
import Cookies from 'js-cookie'
const { Title, Text } = Typography;

function AssignmentSubmiss() {
  const token = Cookies.get('token')
  const { id, assId } = useParams();
  const [submits, setSubmits] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  // Gọi API lấy danh sách bài nộp khi load component
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/class/${id}/assignment/${assId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSubmits(res.data.data.content);
      } catch (err) {
        if(err.response.status === 403){
          nav(`/error403`);
        }
        if(err.response.status === 401){
          nav(`/`);
        }
        message.error("Lỗi khi tải bài nộp");
      }
    };
    fetchData();
  }, [id, assId, loading]);

  // Khi chọn bài nộp
  const handleSelect = (submission) => {
    setSelectedSubmission(submission);
    setScore(submission.score);
  };

  // Chuyển Google Drive URL sang dạng preview
  const convertToPreviewUrl = (originalUrl) => {
    const match = originalUrl.match(/id=([^&]+)/);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : null;
  };

  // Gửi điểm chấm bài
  const handleScoreSubmit = async (value) => {
    if (score === null || score < 0 || score > 10) {
      message.warning("Điểm phải từ 0 đến 10");
      return;
    }

    try {
      const res = await instance.put(`/class/${id}/assignment/${assId}/s/${value}`, {score}, {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });

      if (res.data.status === 200) {
        message.success("Chấm điểm thành công!");
        // Cập nhật lại danh sách bài nộp
        const updatedList = submits.map((s) =>
          s.id === selectedSubmission.id
            ? { ...s, score, statusSubmit: "SCORED" }
            : s
        );
        setSubmits(updatedList);
        setSelectedSubmission({ ...selectedSubmission, score, statusSubmit: "SCORED" });
        setLoading(!loading);
      } else {
        message.error("Chấm điểm thất bại!");
      }
    } catch (error) {
      console.error(error);
      message.error("Có lỗi khi gửi điểm");
    }
  };

  // Component giao diện
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
        {/* LEFT: Danh sách bài nộp */}
        <div
          style={{
            width: "40%",
            padding: "16px",
            borderRight: "1px solid #ddd",
            background: "#f9f9f9",
          }}
        >
          <Title level={4}>Bài nộp</Title>
          <List
            dataSource={submits}
            renderItem={(item) => (
              <List.Item
                onClick={() => handleSelect(item)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  borderRadius: "6px",
                  background:
                    selectedSubmission?.id === item.id ? "#e6f7ff" : "transparent",
                }}
              >
                <Text strong>{item.studentName}</Text>
                <Text type="secondary" style={{ marginLeft: "8px" }}>
                  ({new Date(item.submissionTime).toLocaleString()})
                </Text>
                {item.statusSubmit === "SCORED" && (
                  <Text strong style={{ marginLeft: "auto" }}>{item.score}</Text>
                )}
                {item.statusSubmit != "SCORED" && (
                  <Text strong style={{ marginLeft: "auto" }}>Chưa chấm</Text>
                )}

              </List.Item>
            )}
          />
        </div>

        {/* RIGHT: Chi tiết bài nộp */}
        <div style={{ width: "60%", padding: "16px", background: "#fff" }}>
          {selectedSubmission ? (
            <Card
              title={`Chi tiết - ${selectedSubmission.studentName}`}
              style={{ maxWidth: 800, width: "100%" }}
            >
              <p><strong>Ngày nộp:</strong> {selectedSubmission.submissionTime}</p>
              <p><strong>Trạng thái:</strong> {selectedSubmission.statusSubmit}</p>

              {/* Nếu bài đã nộp hoặc đã chấm */}
              {(selectedSubmission.statusSubmit === "SUBMITTED" ||
                selectedSubmission.statusSubmit === "CONFIRMED" ||
                selectedSubmission.statusSubmit === "SCORED") && (
                <>
                  <p>
                    <strong>Điểm:</strong>{" "}
                    {selectedSubmission.statusSubmit === "SCORED"
                      ? selectedSubmission.score
                      : "CHƯA CHẤM"}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <strong>Chấm điểm:</strong>
                    <InputNumber
                      min={0}
                      max={10}
                      step={0.5}
                      value={score}
                      onChange={(value) => setScore(value)}
                      style={{ width: 100 }}
                    />
                    <Button
                      type="primary"
                      onClick={() => handleScoreSubmit(selectedSubmission.id)}
                      disabled={score === null}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}

              {/* Hiển thị file nếu có */}
              {selectedSubmission.submitUrl && (
                <iframe
                  src={convertToPreviewUrl(selectedSubmission.submitUrl)}
                  width="100%"
                  height="400"
                  allow="autoplay"
                  title="Drive File Preview"
                  style={{ marginTop: 20 }}
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
