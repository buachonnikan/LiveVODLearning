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
  }, [cb]);
}

export function useWillUnmount(cb) {
  const scope = useRef({ isMounted: false });
  useEffect(() => {
    return cb;
  }, [cb]);
}
const Chat = ({ c, t }) => {
  const [color, setColor] = useState("");
  const colors = ["#e78500", "#ffce00", "#94b811"];

  const getRandomColor = () => {
    var item = colors[Math.floor(Math.random() * colors.length)];
    setColor(item);
  };
  useEffect(() => {
    getRandomColor();
  }, [getRandomColor]);

  function time(t, c) {
    var ms = moment(c).diff(moment(t));
    var d = moment.duration(ms);
    var res =
      (d._data.hours < 9
        ? "0" + d._data.hours.toString()
        : d._data.hours.toString()) +
      ":" +
      (d._data.minutes < 9
        ? "0" + d._data.hours.toString()
        : d._data.minutes.toString()) +
      ":" +
      d._data.seconds.toString();
    return res;
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
