import { Result, Progress, Card } from "antd";

const data = {
	id: 1,
	result: 7, // số câu đúng
	questions: 10, // tổng số câu
	totalTime: "120 phút",
};

export function QuizResultChart() {
	const percent = Math.round((data.result / data.questions) * 100); // Tính % đúng

	return (
		<Card
			style={{
				width: "100%",
				maxWidth: "600px",
				margin: "2rem auto",
				borderRadius: "12px",
				boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
			}}
			bodyStyle={{ padding: "2rem" }}
		>
			<Result
				status={percent >= 50 ? "success" : "error"} // Thành công nếu >= 50%
				title={`Bài thi số ${data.id}`}
				subTitle={`Bạn đã trả lời đúng ${data.result}/${data.questions} câu hỏi`}
				extra={[
					<div key="time" style={{ marginBottom: "1rem", fontSize: "16px" }}>
						⏱ Thời gian làm bài: {data.totalTime}
					</div>,
				]}
			/>
			{/* Biểu đồ % đúng */}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginTop: "1rem",
				}}
			>
				<Progress
					type="circle"
					percent={percent}
					format={(percent) => `${percent}%`}
					strokeColor={percent >= 50 ? "#52c41a" : "#ff4d4f"} // Màu dựa theo kết quả
					size={150}
				/>
			</div>
		</Card>
	);
}
