import {
  DatabaseOutlined,
  LineChartOutlined,
  MessageOutlined,
  SettingOutlined,
  SolutionOutlined,
  TeamOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useParams } from "react-router-dom";

function MenuTeach() {
  const { id } = useParams();
  const item = [
    {
      label: <Link to={`/class/${id}`}>Trang chủ</Link>,
      icon: <LineChartOutlined />,
      key: "Menu-1",
    },
    {
      label: <Link to={`/class/${id}/member-mana`}>Quản lí thành viên</Link>,
      icon: <TeamOutlined />,
      key: "Menu-2",
    },
    {
      label: <Link to={`/class/${id}/assignment-mana`}>Quản lí bài tập</Link>,
      icon: <SolutionOutlined />,
      key: "Menu-3",
    },
    {
      label: <Link to={`/class/${id}/lecture-mana`}>Quản lí bài giảng</Link>,
      icon: <VideoCameraOutlined />,
      key: "Menu-4",
    },
    {
      label: <Link to={`/class/${id}/chat-group`}>Nhóm Chat</Link>,
      icon: <MessageOutlined />,
      key: "Menu-5",
    },
    {
      label: <Link to={`/class/${id}/quizz-mana`}>Kiểm tra</Link>,
      icon: <DatabaseOutlined />,
      key: "Menu-6",
    },
    {
      label: <Link to={`/class/${id}/setting-mana`}>Cài đặt</Link>,
      icon: <SettingOutlined />,
      key: "Menu-7",
    },
  ];

  return (
    <>
      <Menu mode="inline" items={item} defaultSelectedKeys={["Menu-1"]} />
    </>
  );
}

export default MenuTeach;
