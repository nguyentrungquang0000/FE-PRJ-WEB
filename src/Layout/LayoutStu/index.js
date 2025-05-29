import { Divider, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import MenuStu from "../../Components/MenuStu";
import { AppstoreOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;

function LayoutStu() {
  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        width="200px"
        theme="light"
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">
          <img src="/image/Logo2-web.png" alt="Logo" width="200px" />
        </div>
        <Divider style={{ borderColor: "#7cb305" }}>
          <AppstoreOutlined />
        </Divider>
        <MenuStu />
      </Sider>

      <Layout style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ height: "64px", flexShrink: 0 }}>
          <Header />
        </div>

        <Content style={{ flex: 1, overflowY: "auto", backgroundColor: "#f9f9f9" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutStu;
