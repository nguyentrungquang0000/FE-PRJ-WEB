import { Button, Card } from "antd";

export function QuizList() {
	return (
		<>
			{[...Array(10)].map((_, index) => (
				<Card
					key={index}
					style={{
						width: "100%",
						maxWidth: "1000px",
						margin: "1rem auto",
						border: "1px solid #f0f0f0",
						borderRadius: "12px",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
						cursor: "pointer",
					}}
					bodyStyle={{ padding: "1.5rem" }}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						{/* Bên trái: thông tin bài thi */}
						<div>
							<h3 style={{ margin: 0, marginBottom: "0.5rem" }}>
								Bài thi số {index + 1}
							</h3>
							<div
								style={{
									color: "#888",
									fontSize: "0.9rem",
									marginBottom: "0.25rem",
								}}
							>
								Ngày tạo: 17/03/2025
							</div>
							<div style={{ color: "#888", fontSize: "0.9rem" }}>
								Hạn nộp: 25/03/2025
							</div>
						</div>

						{/* Bên phải: các nút */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end",
								gap: "0.5rem",
							}}
						>
							<Button
								type="primary"
								size="small"
								style={{
									borderRadius: "8px",
									backgroundColor: "#1677ff",
									fontWeight: "500",
									padding: "0 12px",
								}}
							>
								10 câu hỏi
							</Button>
							<Button
								type="primary"
								size="small"
								style={{
									borderRadius: "8px",
									backgroundColor: "green",
									fontWeight: "500",
									padding: "0 12px",
								}}
								href={`/home-stu/${index + 1}`}
							>
								Làm bài thi
							</Button>
						</div>
					</div>
				</Card>
			))}
		</>
	);
}