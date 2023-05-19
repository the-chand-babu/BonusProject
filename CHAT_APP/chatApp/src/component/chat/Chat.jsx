import React, { useEffect, useState } from "react";
import { user } from "../join/Join";
import { useRef } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import closeIcon from "../../images/closeIcon.png";
import logo from "../../images/logo.png";
import socketIo from "socket.io-client";
import Message from "../message/Message";

let socket;

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  const ENDPOINT = "http://localhost:4500/";

  const send = () => {
    console.log(inputRef.current.value);
    if (!inputRef.current.value) return;
    const message = inputRef.current.value;

    socket.emit("message", { message, id });

    inputRef.current.value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      //   alert("Connected");
      setid(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("connectionLost");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <img src={logo} alt="" />
          <a href="/">
            {" "}
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            ref={inputRef}
            onKeyPress={(e) => (e.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
