import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [input, setInput] = useState();
  const API_SERVER = "http://localhost:4000";
  const socket = io(API_SERVER);
  // useEffect(() => {
  //   socketInitializer();
  // }, []);

  const inputChanged = (e) => {
    console.log(e.target.value);
    socket.emit("input-change", e.target.value);
  };
  socket.on("connect", () => {
    console.log("connected");
  });
  socket.on("update-input", (msg) => {
    setInput(msg);
  });
  // const socketInitializer = async () => {

  // };
  socket.emit("join", { username: "orgil" }, (err) => {
    if (err) {
      alert(err);
    }
  });

  return (
    <input
      placeholder="Type here"
      value={input}
      onChange={inputChanged}
    ></input>
  );
}
