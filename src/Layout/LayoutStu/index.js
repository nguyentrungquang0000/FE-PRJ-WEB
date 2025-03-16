import {Layout} from "antd";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import MenuStu from "../../Components/MenuStu";

const {Sider, Content} = Layout;

function LayoutStu(){
  return(
    <Layout>
      <Sider width="200px" theme="light" 
        style={{ height: "100vh", position: "sticky", top: 0, bottom: 0 }}
      >
        <div className="logo">
          <img src="./image/Logo2-web.png" alt="Logo" width="200px" />
        </div>
        <div class>
          Stu
        </div>
        <MenuStu/>
      </Sider>
      <Layout>
        <Header/>
        <Content>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutStu;