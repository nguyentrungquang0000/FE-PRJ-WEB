import { CaretDownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Table } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const data = [
	{
		id: 1,
		title: "Math Homework",
		dueDate: "2025-03-10T23:59:59",
		description: "Solve 10 algebra problems",
		url: "https://drive.google.com/assignment1",
		createdDate: "2025-02-28T12:00:00",
		classroom: {
			id: "CLASS123",
		},
		submissions: [],
	},
	{
		id: 2,
		title: "Physics Experiment Report",
		dueDate: "2025-03-15T23:59:59",
		description: "Write a report on Newton's Laws",
		url: "https://drive.google.com/assignment2",
		createdDate: "2025-02-28T14:30:00",
		classroom: {
			id: "CLASS456",
		},
		submissions: [],
	},
	{
		id: 3,
		title: "History Essay",
		dueDate: "2025-03-12T23:59:59",
		description: "Discuss the causes of World War II",
		url: "https://drive.google.com/assignment3",
		createdDate: "2025-02-28T15:45:00",
		classroom: {
			id: "CLASS789",
		},
		submissions: [],
	},
	{
		id: 4,
		title: "Biology Lab Report",
		dueDate: "2025-03-20T23:59:59",
		description: "Analyze the structure of plant cells",
		url: "https://drive.google.com/assignment4",
		createdDate: "2025-02-28T16:20:00",
		classroom: {
			id: "CLASS234",
		},
		submissions: [],
	},
	{
		id: 5,
		title: "Computer Science Project",
		dueDate: "2025-03-18T23:59:59",
		description: "Build a simple website using HTML, CSS, and JavaScript",
		url: "https://drive.google.com/assignment5",
		createdDate: "2025-02-28T17:10:00",
		classroom: {
			id: "CLASS567",
		},
		submissions: [],
	},
	{
		id: 6,
		title: "Chemistry Research",
		dueDate: "2025-03-25T23:59:59",
		description: "Write about the periodic table trends",
		url: "https://drive.google.com/assignment6",
		createdDate: "2025-02-28T18:00:00",
		classroom: {
			id: "CLASS890",
		},
		submissions: [],
	},
	{
		id: 7,
		title: "Economics Case Study",
		dueDate: "2025-03-22T23:59:59",
		description: "Analyze the 2008 financial crisis",
		url: "https://drive.google.com/assignment7",
		createdDate: "2025-02-28T19:15:00",
		classroom: {
			id: "CLASS321",
		},
		submissions: [],
	},
	{
		id: 8,
		title: "English Literature Analysis",
		dueDate: "2025-03-17T23:59:59",
		description: "Compare two Shakespearean plays",
		url: "https://drive.google.com/assignment8",
		createdDate: "2025-02-28T20:30:00",
		classroom: {
			id: "CLASS654",
		},
		submissions: [],
	},
	{
		id: 9,
		title: "Art Portfolio Submission",
		dueDate: "2025-03-29T23:59:59",
		description: "Submit a collection of 5 paintings",
		url: "https://drive.google.com/assignment9",
		createdDate: "2025-02-28T21:00:00",
		classroom: {
			id: "CLASS987",
		},
		submissions: [],
	},
	{
		id: 10,
		title: "Music Composition Task",
		dueDate: "2025-03-27T23:59:59",
		description: "Compose a short instrumental piece",
		url: "https://drive.google.com/assignment10",
		createdDate: "2025-02-28T22:45:00",
		classroom: {
			id: "CLASS111",
		},
		submissions: [],
	},
];

const items = [
	{
		key: "1",
		label: <Link to="/assignment-detail">Xem chi tiết</Link>,
	},
	{
		key: "2",
		label: <Link to="/assignment-submiss">Xem bài nộp</Link>,
	},
	{
		key: "3",
		label: (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.luohanacademy.com"
			>
				Xoá
			</a>
		),
	},
	{
		key: "4",
		label: <Link to="/scoreboard">Xem kết quả</Link>,
	},
];

function AssignmentMana() {
	const nav = useNavigate();
	const columns = [
		{
			title: "Title",
			dataIndex: "title",
		},
		{
			title: "Ngày tạo",
			dataIndex: "createdDate",
		},
		{
			title: "Hết hạn",
			dataIndex: "dueDate",
		},
		{
			title: "Hành động",
			key: "actions",
			render: (_, record) => (
				<Dropdown
					menu={{ items }}
					placement="bottomRight"
					arrow={{ pointAtCenter: true }}
				>
					<Button>
						<CaretDownOutlined />
					</Button>
				</Dropdown>
			),
		},
	];
	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<h2>Danh sách bài tập</h2>
				<Button type="primary" onClick={() => nav("/create-ass")}>
					Thêm bài tập
				</Button>
			</div>

			<Table columns={columns} dataSource={data} />
		</div>
	);
}

export default AssignmentMana;
