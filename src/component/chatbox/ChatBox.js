import React, { useState, useRef, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../css/ChatBox.css";
import "../css/Dialog.css";
import { TextArea, Button } from "@ui5/webcomponents-react";
import { LayoutContext } from "../context/LayoutContext";

const ChatBox = ({ isSubmitted, onSubmit }) => {
  const [messages, setMessages] = useState([]);
  const [textArea, setTextArea] = useState("");
  const { setLayout } = React.useContext(LayoutContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  let onSend = async function (event) {
    event.preventDefault();
    setMessages([...messages, { text: textArea, sender: "user" }]);
    setTextArea("");
    onSubmit();

    const postData = {
      messages: [
        {
          role: "user",
          content: textArea,
        },
      ],
      model: "gpt-4o",
    };

    try {
      const response = await fetch("http://localhost:8080/UIconfig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      let jsonRes = await response.json();
      console.log(jsonRes["message"]);

      setLayout(JSON.parse(jsonRes["message"]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`dialog ${isSubmitted ? "submitted" : ""}`}>
      <div className="chatBox">
        <ScrollToBottom className="chatBox__messages">
          {messages.map((message, index) => (
            <p key={index} className={message.sender}>
              {message.text}
            </p>
          ))}
          <div ref={messagesEndRef} />
        </ScrollToBottom>
        <form className="chatBox__input">
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "0.25rem",
              padding: "0 0.75rem 0.75rem 0.75rem",
            }}
          >
            <TextArea
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
              placeholder="Type a message"
              type="text"
            />
            <Button onClick={onSend} type="submit" style={{ width: "80px" }}>
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
