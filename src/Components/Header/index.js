import {
  AntDesignOutlined,
  CaretDownOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate(); // Hook để chuyển hướng

  // Xử lý sự kiện khi chọn menu item
  const handleMenuClick = ({ key }) => {
    if (key === "0") {
      // Chỉ chuyển trang khi chọn "Thông tin cá nhân"
      navigate("/profile"); // Điều hướng đến trang thông tin cá nhân
    }
    // Nếu chọn mục khác, có thể thực hiện hành động khác như đăng xuất
    else if (key === "1") {
      console.log("Đăng xuất...");
      // Xử lý đăng xuất ở đây (ví dụ: xóa token và chuyển đến trang login)
      navigate("/login");
    }
  };

  // Danh sách menu
  const items = [
    {
      label: "Thông tin cá nhân", // Mục thông tin cá nhân
      key: "0",
    },
    {
      label: "Đăng xuất", // Mục đăng xuất
      key: "1",
    },
  ];

  return (
    <div style={{ position: "sticky", top: 0, right: 0, zIndex: 100 }}>
      <div className="header">
        <div className="icon__home" onClick={() => navigate('/class')}>
          <HomeOutlined />
        </div>

        <div className="header__avatar">
          <Dropdown
            menu={{
              items, // Các item menu
              onClick: handleMenuClick, // Xử lý sự kiện click
            }}
            trigger={["click"]}
          >
            <div>
              <div>
                <Avatar icon={<AntDesignOutlined />} />
              </div>
              <div>Name</div>
              <CaretDownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Header;
