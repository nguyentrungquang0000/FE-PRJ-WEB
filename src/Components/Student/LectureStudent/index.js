import React, { useState, useRef, useEffect } from "react";
import { Layout, List, Typography, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";
import Cookies from 'js-cookie';
const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

// ✅ Hàm tách fileId từ URL Google Drive
const getDriveFileId = (url) => {
  const match = url.match(/[-\w]{25,}/);
  return match ? match[0] : null;
};

export function LectureStudent() {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const token = Cookies.get('token');
  const nav = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(`/class/${id}/lecture`, {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });
        const data = res.data.data;
        setVideos(data);
        if (data.length > 0) {
          setSelectedVideo(data[0]);
        }
      } catch (error) {
        if(error.response.status === 403){
          nav(`/error403`);
        }
        console.error("Failed to fetch lectures:", error);
      }
    };
    fetchData();
  }, [id]);

  const changeVideo = (video) => {
    setSelectedVideo({ ...video });
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: 20 }}>
      <Content style={{ flex: 2, paddingRight: 20 }}>
        {selectedVideo && (
          <Card>
            <iframe
              src={`https://drive.google.com/file/d/${getDriveFileId(selectedVideo.lectureUrl)}/preview`}
              width="100%"
              height="480"
              allow="autoplay"
              title={selectedVideo.title}
              style={{ border: "none" }}
            />
            <Title level={3} style={{ marginTop: 10 }}>{selectedVideo.title}</Title>
            <Paragraph>{selectedVideo.description}</Paragraph>
          </Card>
        )}
      </Content>

      <Sider width={300} style={{ background: "#fff", padding: "10px 20px" }}>
        <Title level={4}>Danh sách bài giảng</Title>
        <List
          dataSource={videos}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              onClick={() => changeVideo(item)}
              style={{
                cursor: "pointer",
                padding: 10,
                borderBottom: "1px solid #ddd",
                background: selectedVideo && selectedVideo.lectureUrl === item.lectureUrl ? "#f0f0f0" : "transparent"
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
