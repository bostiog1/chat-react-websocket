import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export function useChatLogic() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("chat_history", (history) => setMessages(history));
    socket.on("receive_message", (data) =>
      setMessages((prev) => [...prev, data])
    );
    socket.on("users", (userList) => setUsers(userList));

    return () => {
      socket.off("chat_history");
      socket.off("receive_message");
      socket.off("users");
    };
  }, []);

  const joinChat = () => {
    if (username.trim() !== "") {
      socket.emit("set_username", username);
      setIsConnected(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "" && username.trim() !== "") {
      socket.emit("send_message", { message });
      setMessage("");
    }
  };

  const clearChat = () => {
    socket.emit("clear_chat");
    setMessages([]); // Clear locally
  };

  return {
    username,
    setUsername,
    message,
    setMessage,
    messages,
    users,
    isConnected,
    joinChat,
    sendMessage,
    clearChat,
  };
}
