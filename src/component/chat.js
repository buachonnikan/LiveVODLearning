import React, { useState, useEffect, useRef } from "react";
import "../css/base.css";
import axios from "axios";
import userr from "./checkType";
import Axios from "axios";

export function useDidMount(cb) {
  const scope = useRef({ isMounted: false });
  useEffect(() => {
    if (!!!scope.current.isMounted) {
      scope.current.isMounted = true;
      cb();
    }
  }, [cb]);
}

export function useWillUnmount(cb) {
  const scope = useRef({ isMounted: false });
  useEffect(() => {
    return cb;
  }, [cb]);
}
const Chat = ({ room }) => {
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const [timestamp, setTime] = useState();
  const [color, setColor] = useState("#e78500");
  const colors = ["#e78500", "#ffce00", "#94b811"];
  const typeChat = c => setChat(c);
  const pullingRef = useRef({ isRunning: true, cancelFunc: {} });

  // const getRandomColor = () => {
  //   var item = colors[Math.floor(Math.random() * colors.length)];
  //   setColor(item);
  // };

  useEffect(() => {
    // getRandomColor();
    const pull = () => {
      axios
        .post("/_api/message/pull", {
          timestamp: timestamp,
          room: room
        })
        .then(res => {
          setChats(s => s.concat(res.data));
          if (pullingRef.current.isRunning) {
            setTimeout(pull, 0);
          } else {
            console.log("END PULLING");
          }
        })
        .catch(e => setTimeout(pull, 0));
    };
    pull();

    return () => {
      pullingRef.current.isRunning = false;
    };
  }, [room, timestamp]);

  const handelSubmit = e => {
    e.preventDefault();
    typeChat(chat);
    userr
      .axiosAuthen()
      .post("/_api/message/push", { chat: chat, room: room })
      .then(res => {
        setTime(res.data.timestamp);
      });
    setChat("");
  };
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return (
    <div class="for-chat">
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
            <div className="time-chat">
              {new Date(c.timestamp).toLocaleString().split(", ")[1]}
            </div>
          </div>
        ))}
      </div>
      <div className="input-contain">
        <form onSubmit={handelSubmit} autocomplete="off">
          <input
            name="chat"
            value={chat}
            onChange={e => setChat(e.target.value)}
            className="input-chat"
          />
          <button className="chat-send" alt="send-chat">
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
