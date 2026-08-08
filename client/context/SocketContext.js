"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  const socket = useContext(SocketContext);

  // if (!socket) throw new Error("useSocket must be used within SocketProvider");

  return socket;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return;
    }
    console.log(url);

    // point to the server
    const newSocket = io(url, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    // Debug events
    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
