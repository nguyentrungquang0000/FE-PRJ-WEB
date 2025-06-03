import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Avatar, Typography, Space } from "antd";
import {
  BookOutlined,
  FileTextOutlined,
  TeamOutlined,
  FileDoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../apis/instance";
import Cookies from "js-cookie";

const { Title, Text } = Typography;

const Dashboard = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const [dashboard, setDashboard] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/dashboard/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboard(res.data.data);
      } catch (error) {
        if(error.response.status === 403){
          nav(`/error403`);
        }
        if(error.response.status === 401){
          nav(`/`);
        }
      }
    };

    fetchData();
  }, [id]);

  const chartData = [
    { name: "Bài giảng", value: dashboard.countLecture || 0 },
    { name: "Bài tập", value: dashboard.countAssignment || 0 },
    { name: "Học sinh", value: dashboard.countStudent || 0 },
    { name: "Bài kiểm tra", value: dashboard.countTest || 0 },
  ];

  return (
    <div
      style={{
        padding: 32,
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Thống kê chính */}
      <Row gutter={[24, 24]}>
        {[
          {
            title: "Số bài giảng",
            value: dashboard.countLecture || 0,
            color: "#ff7a45",
            icon: <BookOutlined style={{ color: "#ff7a45" }} />,
          },
          {
            title: "Số bài tập",
            value: dashboard.countAssignment || 0,
            color: "#36cfc9",
            icon: <FileTextOutlined style={{ color: "#36cfc9" }} />,
          },
          {
            title: "Số học sinh",
            value: dashboard.countStudent || 0,
            color: "#597ef7",
            icon: <TeamOutlined style={{ color: "#597ef7" }} />,
          },
          {
            title: "Số bài kiểm tra",
            value: dashboard.countTest || 0,
            color: "#9254de",
            icon: <FileDoneOutlined style={{ color: "#9254de" }} />,
          },
        ].map(({ title, value, color, icon }, idx) => (
          <Col xs={24} sm={12} md={6} key={idx}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow:
                  "0 4px 12px rgb(0 0 0 / 0.05), 0 2px 8px rgb(0 0 0 / 0.1)",
                backgroundColor: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  padding: 12,
                  borderRadius: "50%",
                  backgroundColor: `${color}33`, // màu nhẹ hơn
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {icon}
              </div>
              <Statistic
                title={title}
                value={value}
                valueStyle={{ color, fontWeight: "700", fontSize: 24 }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Biểu đồ và thông tin lớp học */}
      <Row gutter={[24, 24]} style={{ marginTop: 40 }}>
        <Col xs={24} md={16}>
          <Card
            title="Biểu đồ thống kê"
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow:
                "0 4px 20px rgb(0 0 0 / 0.07), 0 2px 12px rgb(0 0 0 / 0.12)",
              backgroundColor: "#fff",
              padding: 24,
            }}
          >
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} margin={{ top: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#8884d8", fontWeight: "600" }}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "#8884d8", fontWeight: "600" }}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "none" }}
                  cursor={{ fill: "#f5f5f5" }}
                />
                <Bar dataKey="value" fill="#597ef7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              background: "linear-gradient(135deg, #6e8efb, #a777e3)",
              color: "white",
              textAlign: "center",
              padding: "40px 24px",
              boxShadow:
                "0 8px 30px rgb(110 142 251 / 0.4), 0 6px 12px rgb(110 142 251 / 0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              minHeight: 320,
              maxWidth: 360,
              margin: "0 auto",
              wordBreak: "break-word",
            }}
          >
            <Avatar
              size={80}
              icon={<HomeOutlined />}
              style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            />
            <Title level={3} style={{ color: "white", marginBottom: 4 }}>
              {dashboard.className || "Tên lớp học"}
            </Title>

            <Text
              style={{
                color: "rgba(255,255,255,0.85)",
                marginBottom: 6,
                display: "block",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Giáo viên phụ trách
            </Text>

            <Text
              strong
              style={{
                fontSize: 18,
                color: "white",
                marginBottom: 16,
                letterSpacing: 0.5,
                display: "block",
              }}
            >
              {dashboard.teacherName || "Chưa cập nhật"}
            </Text>

            <Text
              copyable
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: "10px 16px",
                borderRadius: 12,
                fontWeight: "600",
                userSelect: "all",
                cursor: "pointer",
                display: "inline-block",
              }}
            >
              Mã lớp: {dashboard.classId || "-"}
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
