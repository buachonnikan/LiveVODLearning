import React, { useState, useRef, useEffect } from "react";
import "../css/base.css";

const chatArea = ({ chats, color }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [chats]);

  return (
    <div class="chat-area">
      {chats.map(c => (
        <div className="each-chat">
          <div
            className="name-chat set-center"
            style={{ backgroundColor: color }}
          >
            {" "}
            {c.name[0]}
          </div>
          <div className="text-chat">{c.chat}</div>
          <div className="time-chat">{c.timestamp}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default chatArea;
