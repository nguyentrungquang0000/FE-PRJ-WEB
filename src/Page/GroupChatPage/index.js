import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input } from "antd";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import { instance } from "../../apis/instance";

export function GroupChatPage() {
  const userId = Cookies.get("userId");
  const role = Cookies.get("role");
  const { id } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState();
  const token = Cookies.get("token");
  const stompClientRef = useRef(null);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);
  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(`/topic/class/${id}`, (message) => {
          const body = JSON.parse(message.body);
          setMessages((prev) => [...prev, body]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [id]);

  useEffect(() => {
    fetchData();
    setInitialLoaded(true);
  }, []);

  useEffect(() => {
    if (initialLoaded && containerRef.current) {
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight;
      setInitialLoaded(false);
    }
  }, [messages]);

  const fetchData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const container = containerRef.current;
    const previousHeight = container?.scrollHeight || 0;

    try {
      const res = await instance.get(`/class/${id}/display`, {
        params: {
          lastMessageId: lastMessage,
          limit: 20,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.data.length === 0) {
        setHasMore(false);
      } else {
        const body = res.data.data;
        setMessages((prev) => [...body, ...prev]);
        setTimeout(() => {
          const newHeight = container.scrollHeight;
          container.scrollTop += newHeight - previousHeight;
        }, 0);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLastMessage(messages[0]?.id || "");
  }, [messages]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollTop < 200) {
      fetchData();
    }
  };

  const handleSend = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: `/app/class/${id}/send`,
        body: JSON.stringify({
          content: inputValue,
          userId: userId,
          role: role,
        }),
      });

      setInputValue("");
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        height: "100vh",
        backgroundColor: "#rgb",
      }}
    >
      {/* Messages area */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          padding: 24,
          overflowY: "auto",
          marginBottom: "50px",
          backgroundColor: "#f5f5f5",
          overflowX: "hidden",
        }}
      >
        {messages.map((msg, index) => {
          const isSelf = msg.senderId == userId && msg.role === role;
          const prevMsg = messages[index - 1];
          const isSameSender =
            prevMsg &&
            prevMsg.senderId === msg.senderId &&
            prevMsg.role === msg.role;

          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: isSelf ? "row-reverse" : "row",
                alignItems: "flex-start",
                marginBottom: 8,
              }}
              onMouseEnter={(e) => {
                const time = e.currentTarget.querySelector(".message-time");
                if (time) time.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const time = e.currentTarget.querySelector(".message-time");
                if (time) time.style.opacity = "0";
              }}
            >
              {/* Avatar Column - fixed width */}
              <div
                style={{
                  width: 40,
                  display: "flex",
                  justifyContent: isSelf ? "flex-end" : "flex-start",
                  marginTop: !isSameSender ? 6 : 0,
                }}
              >
                {!isSameSender && <Avatar size={28} icon={<UserOutlined />} />}
              </div>

              {/* Message bubble area */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isSelf ? "flex-end" : "flex-start",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    backgroundColor: isSelf ? "#0084FF" : "#f0f0f0",
                    color: isSelf ? "white" : "black",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                    border: msg.isPinned
                      ? "2px solid gold"
                      : "1px solid #e0e0e0",
                    maxWidth: "75%",
                  }}
                >
                  {!isSameSender && (
                    <div style={{ fontWeight: 500, marginBottom: 4 }}>
                      {msg.sender}
                    </div>
                  )}
                  <div style={{ fontSize: 15, whiteSpace: "pre-wrap" }}>
                    {msg.deleted ? (
                      <i style={{ color: "#e0e0e0" }}>(Tin nhắn đã bị xoá)</i>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>

                <div
                  className="message-time"
                  style={{
                    fontSize: 11,
                    color: "#888",
                    marginTop: 4,
                    opacity: 0,
                    transition: "opacity 0.2s ease-in-out",
                    padding: isSelf ? "0 4px 0 0" : "0 0 0 4px",
                  }}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input section fixed at the bottom */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid #ddd",
          backgroundColor: "#fff",
          display: "flex",
          flex: 1,
          gap: 8,
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <Input
          style={{ width: "83%" }}
          placeholder="Nhập tin nhắn..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onPressEnter={handleSend}
        />
        <Button type="primary" onClick={handleSend}>
          Gửi
        </Button>
      </div>
    </div>
  );
}
