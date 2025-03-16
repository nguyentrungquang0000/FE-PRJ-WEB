import React, { useState, useRef } from "react";
import { Layout, List, Typography, Card } from "antd";

const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

const videoData = [
  {
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Bài giảng 1: Giới thiệu React",
    description: "Tổng quan về React và cách sử dụng nó trong dự án thực tế."
  },
  {
    url: "https://www.w3schools.com/html/movie.mp4",
    title: "Bài giảng 2: Component trong React",
    description: "Hiểu về component, props, và cách tái sử dụng chúng."
  },
  {
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    title: "Bài giảng 3: React Hooks",
    description: "Giải thích về useState, useEffect và các hooks quan trọng khác."
  }
];

export function LectureStudent() {
  const [selectedVideo, setSelectedVideo] = useState(videoData[0]);
  const videoRef = useRef(null); // Tạo ref để điều khiển video

  const changeVideo = (video) => {
    setSelectedVideo({ ...video }); // Tạo object mới để React nhận diện thay đổi
    if (videoRef.current) {
      videoRef.current.load(); // Reset video để load lại từ đầu
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: 20 }}>
      {/* Khu vực phát video */}
      <Content style={{ flex: 2, paddingRight: 20 }}>
        <Card>
          <video ref={videoRef} key={selectedVideo.url} width="100%" controls>
            <source src={selectedVideo.url} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
          <Title level={3} style={{ marginTop: 10 }}>{selectedVideo.title}</Title>
          <Paragraph>{selectedVideo.description}</Paragraph>
        </Card>
      </Content>

      {/* Khu vực danh sách bài giảng */}
      <Sider width={300} style={{ background: "#fff", padding: "10px 20px" }}>
        <Title level={4}>Danh sách bài giảng</Title>
        <List
          dataSource={videoData}
          renderItem={(item) => (
            <List.Item
              onClick={() => changeVideo(item)}
              style={{
                cursor: "pointer",
                padding: 10,
                borderBottom: "1px solid #ddd",
                background: selectedVideo.url === item.url ? "#f0f0f0" : "transparent"
              }}
            >
              {item.title}
            </List.Item>
          )}
        />
      </Sider>
    </Layout>
  );
}
