import { useEffect, useState } from "react";
import { InputNumber, DatePicker, Form, Input, Modal, Button, Table, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../../apis/instance";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Title",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Thời gian bắt đầu",
    dataIndex: "startTime",
    key: "startTime",
  },
  {
    title: "Thời gian kết thúc",
    dataIndex: "endTime",
    key: "endTime",
  }
];

export function QuizzMana(){
  const {id} = useParams();
  const [tests, setTests] = useState();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("Quiz Data:", values);
    // Truyền dữ liệu form sang CreateQuizz qua state
    navigate('/quizz-crea', { state: { quizData: values } });
  };

  useEffect(()=>{
    const fetchData = async ()=> {
      const res = await instance.get(`/class/${id}/test`);
      setTests(res.data.data.content);
      console.log(tests);
    }
    fetchData();
  },[])

  return (
    <div>
      <div style={{display: 'flex', justifyContent : 'space-between', alignItems :'center'}}>
        <h2>Danh sách bài tập</h2>
        <div>
          <Button type="primary" onClick={showModal}>
            Tạo bài Quizz
          </Button>
          <Modal title="Tạo bài Quizz" footer={null} open={isModalOpen} onCancel={handleCancel}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                label="Tên bài Quizz"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên bài quizz!" }]}>
                <Input placeholder="Nhập tên bài quizz" />
              </Form.Item>

              <Form.Item
                label="Thời gian làm bài (phút)"
                name="duration"
                rules={[{ required: true, message: "Vui lòng nhập thời gian!" }]}>
                <InputNumber min={1} max={180} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Số câu hỏi"
                name="questionCount"
                rules={[{ required: true, message: "Vui lòng nhập số câu hỏi!" }]}>
                <InputNumber min={1} max={100} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Ngày bắt đầu"
                name="dateStart"
                rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}>
                <DatePicker showTime style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Ngày kết thúc"
                name="dateDue"
                rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}>
                <DatePicker showTime style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Tạo bài Quizz
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>

      <div>
        <Table
          dataSource={tests}
          columns={columns}
          rowKey="id"
          expandable={{
            expandedRowRender: (record) => (
              <>
                <p><strong>Mô tả:</strong> {record.description}</p>
                <p><strong>Số câu hỏi:</strong> {record.countQuestion}</p>
                <p><strong>Thời gian:</strong> {record.examTime} phút</p>
                <p><strong>Ngày đăng bài At:</strong> {new Date(record.createdAt).toLocaleDateString()}</p>
              </>
            ),
            expandRowByClick: true,
            showExpandColumn: false,
          }}
        />
      </div>
    </div>
  );
}
