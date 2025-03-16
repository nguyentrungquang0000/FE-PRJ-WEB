import { Menu } from "antd";
import { DatabaseOutlined, LineChartOutlined, VideoCameraOutlined, SettingOutlined, MessageOutlined, MinusCircleOutlined, TeamOutlined, ExpandOutlined, SolutionOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function MenuStu(){
  const item = [
		{
			label: <Link >Trang chủ</Link>,
			icon: <LineChartOutlined />,
			key: "Menu-1"
		},
        {
			label: <Link to="/home-stu/member-stu">Thành viên lớp</Link>,
			icon: <TeamOutlined />,
			key: "Menu-2"
		},
        {
			label: <Link to="/home-stu/ass-stu">Bài tập</Link>,
			icon: <SolutionOutlined />,
			key: "Menu-3"
		},
        {
			label: <Link to="/home-stu/lecture-stu">Bài giảng</Link>,
			icon: <VideoCameraOutlined />,
			key: "Menu-4"
		},
		{
			label: <Link >Nhóm Chat</Link>,
			icon: <MessageOutlined />,
			key: "Menu-5"
		},
		{
			label: <Link to="/home-stu/quizz-stu" >Kiểm tra</Link>,
			icon: <DatabaseOutlined />,
			key: "Menu-6"
		},
		{
			label: <Link >Cài đặt</Link>,
			icon: <SettingOutlined />,
			key: "Menu-7"
		},
		
	]


	return(
		<>
			<Menu 
				mode = "inline" 
				items = {item}
				defaultSelectedKeys={["Menu-1"]}
			/>
		</>
	)
}

export default MenuStu;