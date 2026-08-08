import Message from "../models/Message.js";
import User from "../models/User.js";

const onlineUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected: ", socket.id);

    socket.on("register", async (userId) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          console.log("No user!");
          return socket.disconnect();
        }

        socket.userId = userId;
        onlineUsers.set(userId, socket.id);
        socket.join(`user:${userId}`);
      } catch (error) {
        socket.disconnect();
      }
    });

    socket.on("send_message", async (data) => {
      const { recipientId, content } = data;
      const senderId = socket.userId;
      console.log("Sender Id: ", senderId);

      if (!senderId || !recipientId) {
        console.log("No recipient id");
        return;
      }

      if (senderId == recipientId.toString()) {
        socket.emit("You messages can't your self");
        return;
      }
      try {
        const newMessage = await Message.create({
          sender: senderId,
          recipient: recipientId,
          content,
        });

        const recipientSocketId = onlineUsers.get(recipientId);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("receive_message", newMessage);
        }

        socket.emit("receive_message", newMessage);
      } catch (error) {
        console.error("Error saving message: ", error);
      }
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
      }
    });
  });
};

export default socketHandler;
