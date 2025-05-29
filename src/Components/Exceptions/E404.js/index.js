import React from "react";

export default function Error404() {

  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <p style={styles.message}>Không tìm thấy trang bạn yêu cầu.</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  code: {
    fontSize: "96px",
    margin: 0,
    color: "#ff4d4f",
  },
  message: {
    fontSize: "18px",
    marginBottom: 24,
  },
};
