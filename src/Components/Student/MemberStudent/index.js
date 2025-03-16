import { Row, Col, Table } from "antd";

const dataMember = [
  {
    "name": "Nguyễn Văn A",
    "sex": "Nam",
    "phone": "0987-654-321"
  },
  {
    "name": "Trần Thị B",
    "sex": "Nữ",
    "phone": "0912-345-678"
  },
  {
    "name": "Lê Minh C",
    "sex": "Nam",
    "phone": "0903-789-456"
  },
  {
    "name": "Phạm Thảo D",
    "sex": "Nữ",
    "phone": "0968-112-233"
  },
  {
    "name": "Hoàng Quốc E",
    "sex": "Nam",
    "phone": "0977-556-778"
  }
];

export function MemberStudent() {
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Giới tínhtính',
			dataIndex: 'sex',
			key: 'sex',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone',
			key: 'phone',
		}
	]

  return (
    <div>
			<Table columns={columns} dataSource={dataMember} />
    </div>
  );
}
