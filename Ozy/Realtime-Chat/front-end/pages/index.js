import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [input, setInput] = useState("");
  const API_SERVER = "http://localhost:4000";
  const socket = io(API_SERVER);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };

  const inputChanged = (e) => {
    console.log(e.target.value);
    socket.emit("inputChange", { value: e.target.value });
  };

  return (
    <input
      placeholder="Type Here"
      value={input}
      onChange={inputChanged}
    ></input>
  );
}
