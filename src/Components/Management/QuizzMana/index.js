import { useEffect, useState } from "react";
import {
  InputNumber,
  DatePicker,
  Form,
  Input,
  Modal,
  Button,
  Table,
  Menu,
  Dropdown,
  Space,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

export function QuizzMana() {
  const { id } = useParams();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = Cookies.get("token");

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const fetchData = async (page = 1, pageSize = 5, search = "") => {
    setLoading(true);
    try {
      const res = await instance.get(`/class/${id}/test`, {
        params: {
          page: page - 1,
          limit: pageSize,
          keyword: search || undefined,  // truyền keyword search, nếu search rỗng thì không truyền
        },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      setTests(res.data.data.content || []);
      setPagination({
        current: page,
        pageSize,
        total: res.data.data.totalElements || 0,
      });
    } catch (error) {
      if(error.response.status === 403){
        navigate(`/error403`);
      }
      if(error.response.status === 401){
        navigate(`/`);
      }
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, searchText);
  }, [id]);

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize, searchText);
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchText(val);
    // reset page to 1 khi search
    fetchData(1, pagination.pageSize, val);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      sorter: true, // nếu API hỗ trợ sort
      // thêm filter/search nếu muốn
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
      render: (value) => (value ? new Date(value).toLocaleString() : "—"),
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "endTime",
      key: "endTime",
      render: (value) => (value ? new Date(value).toLocaleString() : "—"),
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => {
        const menu = (
          <Menu
            onClick={({ key }) => {
              if (key === "submit") {
                handleViewSubmit(record);
              } else if (key === "view") {
                handleViewDetail(record);
              }
            }}
            items={[
              { key: "submit", label: "Xem bài nộp" },
              { key: "view", label: "Xem chi tiết" },
            ]}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<MenuUnfoldOutlined />} type="text" />
          </Dropdown>
        );
      },
      width: 50,
      align: "center",
    },
  ];

  const onFinish = (values) => {
    navigate(`/class/${id}/quizz-crea`, {
      state: {
        quizData: {
          name: values.name,
          description: values.description,
          examTime: values.duration,
          countQuestion: values.questionCount,
          startTime: values.dateStart.toISOString(),
          endTime: values.dateDue.toISOString(),
        },
      },
    });
  };

  const handleViewSubmit = (record) => {
    navigate(`/class/${id}/quizz-mana/${record.id}/submits`);
  };

  const handleViewDetail = (record) => {
    navigate(`/class/${id}/quizz-mana/${record.id}/detail`);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <Space
        style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}
        align="center"
      >

        <Input.Search
          placeholder="Tìm kiếm theo tên bài kiểm tra"
          onChange={handleSearch}
          allowClear
          style={{ width: 300 }}
          value={searchText}
          enterButton
        />

        <Button type="primary" onClick={showModal}>
          Tạo bài Quizz
        </Button>
      </Space>

      <Modal title="Tạo bài Quizz" footer={null} open={isModalOpen} onCancel={handleCancel}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên bài Quizz"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên bài quizz!" }]}
          >
            <Input placeholder="Nhập tên bài quizz" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea rows={3} placeholder="Nhập mô tả bài quizz" />
          </Form.Item>
          <Form.Item
            label="Thời gian làm bài (phút)"
            name="duration"
            rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}
          >
            <InputNumber min={1} max={180} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Số câu hỏi"
            name="questionCount"
            rules={[{ required: true, message: "Vui lòng nhập số câu hỏi!" }]}
          >
            <InputNumber min={1} max={100} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="dateStart"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="dateDue"
            rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tạo bài Quizz
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        dataSource={tests}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}
