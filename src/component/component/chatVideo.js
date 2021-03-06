import React, { useState, useEffect, useRef } from "react";
import "../css/base.css";
import axios from "axios";
import userr from "./checkType";
import Axios from "axios";
import moment from "moment";

export function useDidMount(cb) {
  const scope = useRef({ isMounted: false });
  useEffect(() => {
    if (!!!scope.current.isMounted) {
      scope.current.isMounted = true;
      cb();
    }
  }, []);
}

export function useWillUnmount(cb) {
  const scope = useRef({ isMounted: false });
  useEffect(() => {
    return cb;
  }, []);
}
const Chat = ({ c, t }) => {
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const [timestamp, setTime] = useState();
  const [color, setColor] = useState("");
  const colors = ["#e78500", "#ffce00", "#94b811"];

  useEffect(() => {
    getRandomColor();
  }, []);

  const getRandomColor = () => {
    var item = colors[Math.floor(Math.random() * colors.length)];
    setColor(item);
  };
  function time(t, c) {
    var ms = moment(c).diff(moment(t));
    var d = moment.duration(ms);
    var h = Math.floor(d.asHours()) < 0 ? 0 : Math.floor(d.asHours());
    var s = moment.utc(ms).format("hh:mm:ss");
    return s;
  }
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return (
    <div class="for-chat">
      <div class="chat-area">
        {c.map(c => (
          <div className="each-chat">
            <div
              className="name-chat set-center"
              style={{ backgroundColor: color }}
            >
              {" "}
              {c.name[0]}
            </div>
            <div className="text-chat">{c.chat}</div>
            <div className="time-chat">{time(t, c.timestamp)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
