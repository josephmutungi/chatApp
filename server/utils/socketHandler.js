import Message from "../models/Message.js";
import User from "../models/User.js";

const onlineUsers = new Map();

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("register", async (userId) => {
      try {
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

      if (!senderId || !recipientId) return;
      if (senderId == recipientId.toString()) return;

      try {
        // 1. Save message
        const createdMessage = await Message.create({
          sender: senderId,
          recipient: recipientId,
          content,
        });

        // 2. IMPORTANT: Populate the sender info so frontend has the email
        const newMessage = await Message.findById(createdMessage._id).populate(
          "sender",
          "email",
        );

        // 3. Send to Recipient
        const recipientSocketId = onlineUsers.get(recipientId);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("receive_message", newMessage);
        }

        // 4. Send back to Sender (to replace the optimistic "temp" message)
        socket.emit("receive_message", newMessage);
      } catch (error) {
        console.error("Error saving message: ", error);
      }
    });

    socket.on("disconnect", () => {
      if (socket.userId) onlineUsers.delete(socket.userId);
    });
  });
};

export default socketHandler;
