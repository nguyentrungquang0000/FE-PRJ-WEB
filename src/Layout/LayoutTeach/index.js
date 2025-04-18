import { Image, Layout } from "antd";
import { Outlet } from "react-router-dom";
import MenuTeach from "../../Components/MenuTeach";
import Header from "../../Components/Header";

const { Sider, Content } = Layout;

function LayoutTeach() {
  return (
    <Layout>
      <Sider
        width="200px"
        theme="light"
        style={{ height: "100vh", position: "sticky", top: 0, bottom: 0 }}
      >
        <div className="logo">
          <Image width={200} src="/image/Logo2-web.png" />
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
        <MenuTeach />
      </Sider>
      <Layout style={{ position: "relative" }}>
        <Header />
        <Content style={{ overflow: "auto", height: "100vh" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
export default LayoutTeach;
