import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function E403() {
  const nav = useNavigate()
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>403</h1>
      <p style={styles.message}>Bạn không có quyền truy cập trang này.</p>
      <Button onClick={()=>{nav(-2)}}>Quay lại</Button>
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
    backgroundColor: "#fffbe6",
  },
  code: {
    fontSize: "96px",
    margin: 0,
    color: "#faad14",
  },
  message: {
    fontSize: "18px",
    marginBottom: 24,
  },
};
