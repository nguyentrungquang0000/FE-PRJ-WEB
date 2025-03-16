import { Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const class_info = [
  {
    "id": "CLS12345A1",
    "teacher": "Nguyễn Văn A",
    "name": "Toán 12A1",
    "studentsCount": 35,
    "lecturesCount": 12,
    "assignmentsCount": 5
  },
  {
    "id": "CLS67890B2",
    "teacher": "Trần Thị B",
    "name": "Văn 10B2",
    "studentsCount": 40,
    "lecturesCount": 10,
    "assignmentsCount": 6
  },
  {
    "id": "CLS34567C3",
    "teacher": "Lê Minh C",
    "name": "Lý 11C3",
    "studentsCount": 30,
    "lecturesCount": 15,
    "assignmentsCount": 7
  },
  {
    "id": "CLS89012D4",
    "teacher": "Phạm Hồng D",
    "name": "Hóa 12D4",
    "studentsCount": 28,
    "lecturesCount": 18,
    "assignmentsCount": 8
  },
  {
    "id": "CLS56789E5",
    "teacher": "Hoàng Văn E",
    "name": "Anh 10E5",
    "studentsCount": 45,
    "lecturesCount": 8,
    "assignmentsCount": 4
  },
  {
    "id": "CLS23456F6",
    "teacher": "Vũ Thị F",
    "name": "Sinh 11F6",
    "studentsCount": 32,
    "lecturesCount": 14,
    "assignmentsCount": 6
  },
  {
    "id": "CLS90123G7",
    "teacher": "Đặng Quốc G",
    "name": "Sử 12G7",
    "studentsCount": 38,
    "lecturesCount": 9,
    "assignmentsCount": 5
  },
  {
    "id": "CLS67890H8",
    "teacher": "Bùi Thanh H",
    "name": "Địa 10H8",
    "studentsCount": 29,
    "lecturesCount": 11,
    "assignmentsCount": 4
  },
  {
    "id": "CLS34567I9",
    "teacher": "Trịnh Kim I",
    "name": "GDCD 11I9",
    "studentsCount": 33,
    "lecturesCount": 7,
    "assignmentsCount": 3
  },
  {
    "id": "CLS01234J10",
    "teacher": "Ngô Quang J",
    "name": "Tin học 12J10",
    "studentsCount": 36,
    "lecturesCount": 13,
    "assignmentsCount": 6
  }
]


function ClassMana(){
  const nav = useNavigate();
  return(
    
    <div>
      {class_info.map((item)=>(
        <Row key={item.id} onClick={()=>nav('/')}>
          <Col span={8} >{item.name}</Col>
          <Col span={4} >{item.studentsCount}</Col>
          <Col span={4} >{item.assignmentsCount}</Col>
          <Col span={4} >{item.lecturesCount}</Col>
          <Col span={4} >
            <Button>...</Button>
          </Col>
        </Row>
      ))}
    </div>
  )
}

export default ClassMana;