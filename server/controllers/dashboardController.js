import Message from "../models/Message.js";
import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  const id = req.user.userId;
  if (!id) {
    console.log("No request Id");
    return res.status(400);
  }
  try {
    const userProfile = await User.findById(id).select("-password");
    return res.status(200).json({ user: userProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getConversations = async (req, res) => {
  const userID = req.user.userId || req.query.userId;
  try {
    const messages = await Message.find({
      $or: [{ sender: userID }, { recipient: userID }],
    })
      .populate("sender", "email _id")
      .populate("recipient", "email _id")
      .sort({ createdAt: -1 });
    if (!messages) {
      return res
        .status(400)
        .json({ error: "No messages found for the requested user" });
    }

    if (messages.length === 0) {
      return res.status(400).json({ message: "You have no messages!" });
    }
    const conversations = new Map();

    messages.forEach((msg) => {
      const otherUser =
        msg.sender._id.toString() === userID ? msg.recipient : msg.sender;
      // this means if i am the sender, then the other user is the recipient. Otherwise, the other user is the sender
      // ADD THIS LOG

      //prevent duplicates
      if (!conversations.has(otherUser._id.toString())) {
        conversations.set(otherUser._id.toString(), {
          user: otherUser,
          lastMessage: msg.content,
          createdAt: msg.createdAt,
        });
      }
    });
    // Convert Map values to array and sort by latest message time
    const results = [...conversations.values()].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    return res.status(200).json({ results: results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error getting messages" });
  }
};

export const getConversationMessages = async (req, res) => {
  const { userId2 } = req.query;
  const userID = req.user.userId;

  if (!userId2) {
    return res
      .status(400)
      .json({ error: "User id of other participant is required" });
  }

  try {
    const messages = await Message.find({
      $and: [
        {
          $or: [
            { sender: userID, recipient: userId2 },
            { sender: userId2, recipient: userID },
          ],
        },
      ],
    })
      .populate("sender", "email _id")
      .populate("recipient", "email _id");

    if (!messages || messages.length === 0) {
      return res.status(400).json({ messages: [] });
    }
    return res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error fetching conversation messages" });
  }
};
