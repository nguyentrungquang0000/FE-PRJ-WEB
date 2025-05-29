import React, { useState } from "react";
import { Layout, Button, Typography, Modal, Space } from "antd";
import PageLogin from "../PageLogin";
import PageRegister from "../PageRegister"; // <-- Giả sử bạn có trang đăng ký này

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

function HomePage() {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  return (
    <Layout>
      {/* Header */}
      <Header style={{ backgroundColor: "#1a73e8", padding: 0 }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "0 20px"
        }}>
          <div style={{ color: "#fff", fontSize: "20px" }}>LearnSpace PTIT</div>
          <Space>
            <Button onClick={() => setLoginModal(true)}>Đăng nhập</Button>
            <Button onClick={() => setRegisterModal(true)} type="primary">Đăng ký</Button>
          </Space>
        </div>
      </Header>

      {/* Content */}
      <Content style={{ padding: "50px", backgroundColor: "#f5f5f5" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <Title level={2}>Chào mừng bạn đến Trang Web LearnSpace PTIT</Title>
          <Paragraph>
            Hệ thống của chúng tôi cung cấp các dịch vụ quản lí lớp học trực tuyến giúp việc quản lí trở nên dễ dàng hơn
          </Paragraph>
        </div>

        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <img
            alt="LearnSpace Banner"
            src="/image/home.png"
            style={{
              width: "100%",
              maxWidth: "1200px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center", backgroundColor: "#1a73e8", color: "#fff" }}>
        Hệ thống học tập Online ©2025. All rights reserved.
      </Footer>

      {/* Login Modal */}
      <Modal
        open={loginModal}
        title="Đăng nhập"
        footer={null}
        onCancel={() => setLoginModal(false)}
      >
        <PageLogin onSuccess={() => setLoginModal(false)} />
      </Modal>

      {/* Register Modal */}
      <Modal
        open={registerModal}
        title="Đăng ký"
        footer={null}
        onCancel={() => setRegisterModal(false)}
      >
        <PageRegister onSuccess={() => setRegisterModal(false)} />
      </Modal>
    </Layout>
  );
}

export default HomePage;
