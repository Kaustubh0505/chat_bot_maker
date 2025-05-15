"use client";
import React, { useEffect, useState } from "react";
import { getChatbotByName } from "@/services/chatbot";
import { getToken } from "@/helpers/auth";
import { useParams } from "next/navigation";
import { askGemini } from "@/services/ai";

export default function Page() {
  const { name: chatbotName } = useParams();
  const [botDetails, setBotDetails] = useState({
    name: "",
    context: "",
  });
  const [messages, setMessages] = useState([]); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!chatbotName) return;
    const token = getToken();
    getChatbotByName({ name: chatbotName, token })
      .then((data) => {
        setBotDetails({ ...data });
      })
      .catch((err) => {
        console.error("Error fetching chatbot details:", err);
      });
  }, [chatbotName]);

  const hanldlesend = async () => {
    try {
      setMessages((prev) => [...prev, { sender: "user", text: message }]);

      const response = await askGemini({
        text: message,
        context: botDetails.context,
      });
      const data = await response.json();
      debugger
      const botMessage = data.candidates?.[0]?.content?.parts?.[0]?.text;


      setMessages((prev) => [...prev, { sender: "bot", text: botMessage }]);

    } catch (err) {
      console.error("Error communicating with Gemini API:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, I couldn't process your request." }]);
    }
  };

  return (
    <div className="chatbot-details-container">
      <h1 className="chatbot-title">{botDetails.name}</h1>
      <p className="chatbot-context">Context: {botDetails.context}</p>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
            {msg.sender === "user" ? "You: " : "Bot: "}
            {msg.text}
          </div>
        ))}
      </div>

      <div className="user-message">
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={hanldlesend}>Send</button>
      </div>
    </div>
  );
}