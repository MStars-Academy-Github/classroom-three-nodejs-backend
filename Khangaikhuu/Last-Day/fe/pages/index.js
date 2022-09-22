import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [input, setInput] = useState();

  const API_SERVER = "http://localhost:4000";
  const socket = io(API_SERVER);

  const inputChanged = (e) => {
    console.log(e.target.value);
    socket.emit("inputchange", { value: e.target.value }, (err) => {
      console.log(err);
    });
  };
  socket.on("connect", () => {
    console.log("connected");
  });
  socket.emit("join", { username: "kahgnaik" }, (err) => {
    console.log(err);
  });

  socket.on("inputchange", (msg) => {
    setInput(msg);
  });

  return (
    <input
      placeholder="Type here"
      value={input}
      onChange={inputChanged}
    ></input>
  );
}
