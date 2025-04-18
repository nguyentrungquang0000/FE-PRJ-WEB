import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import MenuStu from "../../Components/MenuStu";

const { Sider, Content } = Layout;

function LayoutStu() {
  return (
    <Layout>
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
          <img src="./image/Logo2-web.png" alt="Logo" width="200px" />
        </div>
        <div
          style={{
            borderBottom: "1px solid #b0b0b0",
            borderTop: "1px solid #b0b0b0",
			padding: "10px 0",
			color: "#3D8EFF",
			margin: "0 5px"
          }}
        >
          <div class>Tên lớp học: Toán 1</div>
          <div class>Giáo viên: Nguyễn Văn A</div>
        </div>

        <MenuStu />
      </Sider>
      <Layout>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutStu;
