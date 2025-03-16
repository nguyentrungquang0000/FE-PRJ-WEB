import { Menu } from "antd";
import { DatabaseOutlined, LineChartOutlined, VideoCameraOutlined, SettingOutlined, MessageOutlined, MinusCircleOutlined, TeamOutlined, ExpandOutlined, SolutionOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


function MenuTeach(){
	const item = [
		{
			label: <Link to="/">Trang chủ</Link>,
			icon: <LineChartOutlined />,
			key: "Menu-1"
		},
        {
			label: <Link to="/member-mana">Quản lí thành viên</Link>,
			icon: <TeamOutlined />,
			key: "Menu-2"
		},
        {
			label: <Link to="/assignment-mana">Quản lí bài tập</Link>,
			icon: <SolutionOutlined />,
			key: "Menu-3"
		},
        {
			label: <Link to="/lecture-mana">Quản lí bài giảng</Link>,
			icon: <VideoCameraOutlined />,
			key: "Menu-4"
		},
		{
			label: <Link to="">Nhóm Chat</Link>,
			icon: <MessageOutlined />,
			key: "Menu-5"
		},
		{
			label: <Link to="/quizz-mana">Kiểm tra</Link>,
			icon: <DatabaseOutlined />,
			key: "Menu-6"
		},
		{
			label: <Link to="/setting-mana">Cài đặt</Link>,
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

export default MenuTeach;