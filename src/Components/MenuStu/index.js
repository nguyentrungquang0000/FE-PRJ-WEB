import { Menu } from "antd";
import { DatabaseOutlined, LineChartOutlined, VideoCameraOutlined, 
         SettingOutlined, MessageOutlined, TeamOutlined, SolutionOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

function MenuStu(){
  const { id } = useParams(); // Lấy classId từ URL

  const items = [
    {
      label: <Link to={`/stu/class/${id}/ass-stu`}>Trang chủ</Link>,
      icon: <LineChartOutlined />,
      key: "Menu-1"
    },
    {
      label: <Link to={`/stu/class/${id}/member-stu`}>Thành viên lớp</Link>,
      icon: <TeamOutlined />,
      key: "Menu-2"
    },
    {
      label: <Link to={`/stu/class/${id}/ass-stu`}>Bài tập</Link>,
      icon: <SolutionOutlined />,
      key: "Menu-3"
    },
    {
      label: <Link to={`/stu/class/${id}/lecture-stu`}>Bài giảng</Link>,
      icon: <VideoCameraOutlined />,
      key: "Menu-4"
    },
    {
      label: <Link to={`/stu/class/${id}/ass-stu`}>Nhóm Chat</Link>,
      icon: <MessageOutlined />,
      key: "Menu-5"
    },
    {
      label: <Link to={`/stu/class/${id}/quizz-stu`}>Kiểm tra</Link>,
      icon: <DatabaseOutlined />,
      key: "Menu-6"
    },
    {
      label: <Link to={`/stu/class/${id}/ass-stu`}>Cài đặt</Link>,
      icon: <SettingOutlined />,
      key: "Menu-7"
    }
  ];

  return (
    <Menu 
      mode="inline" 
      items={items}
      defaultSelectedKeys={["Menu-1"]}
    />
  );
}

export default MenuStu;