import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { groupService } from "../services/groupService";

const GroupChat = ({ groupId, user, onNewMessage }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Load existing messages from database
        const result = await groupService.getGroupMessages(groupId, 50, 0);
        if (result.success) {
          setMessages(result.messages || []);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000", {
        transports: ["websocket"],
        reconnection: true
      });
    }

    socketRef.current.emit("joinGroup", groupId);

    socketRef.current.on("receiveGroupMessage", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          _id: Date.now(),
          message: data.message,
          senderName: data.senderName,
          senderProfilePicture: data.senderProfilePicture,
          timestamp: data.timestamp
        }
      ]);
    });

    initializeChat();

    return () => {
      socketRef.current.emit("leaveGroup", groupId);
    };
  }, [groupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageInput.trim() || !user) return;

    const messageData = {
      _id: Date.now(),
      message: messageInput,
      senderName: user?.name || "Unknown",
      senderProfilePicture: user?.profilePicture || "",
      timestamp: new Date()
    };

    // Add message to UI immediately
    setMessages((prev) => [...prev, messageData]);

    try {
      // Send via Socket.io for real-time (to other users)
      socketRef.current.emit("sendGroupMessage", {
        groupId,
        message: messageInput,
        senderName: user?.name || "Unknown",
        senderProfilePicture: user?.profilePicture || "",
        timestamp: new Date()
      });

      // Also save to database
      await onNewMessage(messageInput);

      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the message from UI if sending failed
      setMessages((prev) => prev.filter(msg => msg._id !== messageData._id));
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading chat...</div>;
  }

  return (
    <div className="flex flex-col h-96 bg-white rounded-lg border border-slate-200">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-slate-400 h-full flex items-center justify-center">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderName === user?.name ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-lg p-3 ${
                  msg.senderName === user?.name
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                <p className="text-xs font-semibold mb-1">
                  {msg.senderName === user?.name ? "You" : msg.senderName}
                </p>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs mt-1 opacity-70">
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-slate-200 p-4 flex gap-2"
      >
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!messageInput.trim()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default GroupChat;
