import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [input, setInput] = useState();

  useEffect(() => {
    socketInitializer();
  }, []);

  const inputChanged = (e) => {
    console.log(e.target.value);
    socket.emit("inputChange", e.target.value);
  };
  const API_SERVER = "http://localhost:3000";

  const socketInitializer = async () => {
    const socket = io(API_SERVER);
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };

  // socket.emit("join", { username: "Odko" }, (err) => {
  //   if (err) {
  //     alert(err);
  //   }
  // });
  return (
    <div className={styles.container}>
      <input placeholder="Type here" value={input} onChange={inputChanged} />
    </div>
  );
}
