import React from "react";
import { Collapse, List, Typography, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;

const assignments = [
  {
    id: 1,
    title: "Bài tập Toán - Hình học",
    deadline: "2025-03-15",
    description: "Giải 5 bài toán về hình học không gian.",
    grade: "Chưa chấm",
  },
  {
    id: 2,
    title: "Bài tập Văn - Nghị luận",
    deadline: "2025-03-18",
    description: "Viết một bài văn nghị luận xã hội về tinh thần trách nhiệm.",
    grade: "8.5/10",
  },
];

export function AssignmentStudent() {
  const nav = useNavigate();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px', height: '100vh' }}>
      <Collapse accordion style={{ width: '80%' }}>
        {assignments.map((assignment) => (
          <Panel
            key={assignment.id}
            header={
              <List.Item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Text strong style={{ textAlign: 'left', marginRight: 'auto' }}>
                  {assignment.title}
                </Typography.Text>
                <Tag color="red">
                  Hạn: {assignment.deadline}
                </Tag>
              </List.Item>
            }
          >
            <p><strong>Mô tả:</strong> {assignment.description}</p>
            <p><strong>Đánh giá:</strong> {assignment.grade}</p>
            <Button type = "primary" onClick={()=>{nav('/assignment-detail')}}>
              Xem hướng dẫn
            </Button>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
