import Header from "../../Components/Header";
import ClassMana from "../../Components/Management/ClassMana";
import React, { useState } from "react";
import { Modal, Form, Input, Button, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";

function HomeClass(){
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log("Form Data:", values);
  };

  const clickSearch = (values) => {
    console.log("Search:", values)
  }


  return(
    <div>
      <div>
        <Header/>
      </div>
      <div>
        <div style={{display: "flex", justifyContent: "space-between", padding: "0 40px"}}>
          <div>
            <Form onFinish={clickSearch} style={{display: "flex"}}>
              <FormItem name="search">
                <Input placeholder="Basic usage" />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
              </FormItem>
            </Form>
          </div>
          <div>
            <Button type="primary" onClick={showModal}>
              Tạo lớp học
            </Button>
            <Modal
              title="Tạo lớp học"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={false}
            >
              <Form
                name="classroom_form"
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 400, margin: "auto", padding: 20, borderRadius: 10 }}
              >
                <Form.Item
                  label="Tên lớp học"
                  name="className"
                  rules={[{ required: true, message: "Vui lòng nhập tên lớp học!" }]}
                >
                  <Input placeholder="Nhập tên lớp học" />
                </Form.Item>

                <Form.Item
                  label="Phần"
                  name="section"
                  rules={[{ required: true, message: "Vui lòng nhập phần!" }]}
                >
                  <Input placeholder="Nhập phần" />
                </Form.Item>

                <Form.Item
                  label="Chủ đề"
                  name="topic"
                  rules={[{ required: true, message: "Vui lòng nhập chủ đề!" }]}
                >
                  <Input placeholder="Nhập chủ đề" />
                </Form.Item>

                <Form.Item
                  label="Phòng"
                  name="room"
                  rules={[{ required: true, message: "Vui lòng nhập phòng!" }]}
                >
                  <Input placeholder="Nhập phòng" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Tạo lớp học
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
        <div>
          <ClassMana/>
        </div>

      </div>
    </div>
  )
}

export default HomeClass;