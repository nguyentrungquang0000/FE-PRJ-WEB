import React from "react";
import { Divider, Input, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";

export function QuizStu() {
	const { id } = useParams();
	console.log(id);
	const nav = useNavigate();
	const data = [
		{
			questions: `Câu 1: 1 + 1 = ?
      A. 2
      B. 3
      C. 4
      D. 5`,
		},

		{
			questions: `Câu 2: 5 x 3 = ?
  A. 15
  B. 20
  C. 25
  D. 10`,
		},

		{
			questions: `Câu 3: Hình vuông có mấy cạnh?
  A. 3
  B. 4
  C. 5
  D. 6`,
		},

		{
			questions: `Câu 4: Con vật nào kêu "gâu gâu"?
  A. Mèo
  B. Chó
  C. Vịt
  D. Trâu`,
		},

		{
			questions: `Câu 5: Thủ đô của Việt Nam là?
  A. TP. Hồ Chí Minh
  B. Hà Nội
  C. Đà Nẵng
  D. Hải Phòng`,
		},

		{
			questions: `Câu 6: 10 - 4 = ?
  A. 5
  B. 6
  C. 7
  D. 8`,
		},

		{
			questions: `Câu 7: Trái đất quay quanh gì?
  A. Mặt trăng
  B. Mặt trời
  C. Sao Hỏa
  D. Sao Kim`,
		},

		{
			questions: `Câu 8: Màu của lá cây là?
  A. Đỏ
  B. Xanh
  C. Vàng
  D. Tím`,
		},

		{
			questions: `Câu 9: Nước sôi ở nhiệt độ bao nhiêu độ C?
  A. 0
  B. 50
  C. 100
  D. 200`,
		},

		{
			questions: `Câu 10: Con vật nào sau đây biết bay?
  A. Cá
  B. Chim
  C. Chó
  D. Mèo`,
		},
	];

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
				padding: "2rem 1rem",
				boxSizing: "border-box",
			}}
		>
			<h3 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
				🎯 Bài kiểm tra trắc nghiệm
			</h3>
			{data.map((question) => (
				<Card
					style={{
						width: "100%",
						maxWidth: "1000px",
						boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
						borderRadius: "12px",
						marginBottom: "1rem",
					}}
					bodyStyle={{ padding: "1.5rem" }}
				>
					<Input.TextArea
						value={question.questions}
						style={{
							marginBottom: "1rem",
							height: "8rem",
							borderRadius: "8px",
							resize: "none",
							fontSize: "1rem",
							backgroundColor: "#f9f9f9",
						}}
						readOnly
					/>

					<Input
						placeholder="Nhập câu trả lời của bạn..."
						style={{
							marginBottom: "1rem",
							borderRadius: "8px",
							height: "3rem",
							fontSize: "1rem",
						}}
					/>

					<Divider style={{ margin: "1.5rem 0" }} />
				</Card>
			))}
			<div style={{ textAlign: "center" }}>
				<button
					style={{
						padding: "0.75rem 2rem",
						borderRadius: "8px",
						border: "none",
						backgroundColor: "#1890ff",
						color: "white",
						fontSize: "1rem",
						cursor: "pointer",
						boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
						transition: "background-color 0.3s ease",
					}}
					onClick={() => nav(`/home-stu/result/${id}`)}
					onMouseOver={(e) =>
						(e.target.style.backgroundColor = "#40a9ff")
					}
					onMouseOut={(e) =>
						(e.target.style.backgroundColor = "#1890ff")
					}
				>
					Nộp bài
				</button>
			</div>
		</div>
	);
}
