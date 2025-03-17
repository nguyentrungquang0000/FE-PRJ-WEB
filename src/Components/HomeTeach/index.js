import React from "react";
import { Card, Avatar, Typography, Space, Input, Button, List } from "antd";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

const comments = [
	{
		author: "Gia Bảo",
		content: "Dạ vâng ạ",
		datetime: "28 thg 12, 2024",
	},
];

const HomeTeach = () => {
	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", flexWrap: "nowrap" }}>
			{[...Array(10)].map(() => (
				<Card
					style={{
						width: "60%",
						marginBottom: 20,
						borderRadius: 10,
					}}
				>
					<Space align="center" style={{ marginBottom: 16 }}>
						<Avatar style={{ backgroundColor: "#f56a00" }}>
							D
						</Avatar>
						<div>
							<Text strong>Duc Duong</Text>
							<div style={{ fontSize: 12, color: "#888" }}>
								24 thg 12, 2024
							</div>
						</div>
					</Space>
					<Paragraph style={{ marginBottom: 16 }}>
						Các ca thi bị lùi 30p nên các bạn chủ động căn lại giờ
						đến thi của ca mình.
					</Paragraph>
					<div
						style={{
							borderTop: "1px solid #f0f0f0",
							paddingTop: 16,
						}}
					>
						<Text strong>
							{comments.length} nhận xét về lớp học
						</Text>
						<List
							dataSource={comments}
							itemLayout="horizontal"
							renderItem={(item) => (
								<List.Item style={{ paddingLeft: 0 }}>
									<Space align="start">
										<Avatar>
											{item.author
												.charAt(0)
												.toUpperCase()}
										</Avatar>
										<div>
											<Text strong>{item.author}</Text>
											<div
												style={{
													fontSize: 12,
													color: "#888",
												}}
											>
												{item.datetime}
											</div>
											<div>{item.content}</div>
										</div>
									</Space>
								</List.Item>
							)}
						/>

						{/* Comment input */}
						<Space
							direction="vertical"
							style={{ width: "100%", marginTop: 16 }}
						>
							<TextArea
								rows={2}
								placeholder="Thêm nhận xét trong lớp học..."
							/>
							<Button type="primary" block>
								Gửi
							</Button>
						</Space>
					</div>
				</Card>
			))}
		</div>
	);
};

export default HomeTeach;
