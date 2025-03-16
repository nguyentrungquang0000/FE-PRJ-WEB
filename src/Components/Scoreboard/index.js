import { Table, Typography } from "antd";

const { Title } = Typography;

const studentsScores = [
  { id: 1, student: "Nguyễn Văn A", score: 95 },
  { id: 2, student: "Trần Thị B", score: 88 },
  { id: 3, student: "Lê Văn C", score: 92 },
  { id: 4, student: "Phạm Thị D", score: 85 },
  { id: 5, student: "Hoàng Văn E", score: 90 },
];

const columns = [
  {
    title: "Học sinh",
    dataIndex: "student",
    key: "student",
  },
  {
    title: "Điểm số",
    dataIndex: "score",
    key: "score",
    sorter: (a, b) => b.score - a.score,
  },
];

function Scoreboard() {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Bảng Xếp Hạng Điểm
      </Title>
      <Table
        dataSource={studentsScores}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}

export default Scoreboard;
