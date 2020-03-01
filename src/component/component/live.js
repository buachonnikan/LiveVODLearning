import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Route, Link } from "react-router-dom";
import "../css/base.css";
import "../css/responsive.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Paper from "./paper";
import ScheduleLive from "./schedule-live";
import Subpaper from "./subpaper";

const Live = () => {
  const [livee, setLive] = useState([]);
  const [now, setNow] = useState([]);

  useEffect(() => {
    axios
      .get("/_api/getlivetoday")
      .then(res => {
        setLive(res.data);
      })
      .catch(err => {});
    axios
      .get("/_api/getlivenow")
      .then(res => {
        console.log(res.data);
        setNow(res.data);
      })
      .catch(err => {});
  }, []);

  return (
    <div>
      <div className="content">
        <div>
          <Link to="/">
            <ArrowBackIosIcon id="arrow" />
          </Link>
          <div className="head">LIVE</div>
        </div>
        <div className="nor">
          <div className="live-part">
            <Paper live={now} head="กำลังถ่ายทอดสดอยู่ในขณะนี้" type="l" />
            <ScheduleLive live={livee} />
          </div>
        </div>
        <div className="none">
          <div className="r-live-part">
            {now.map(data => (
              <Subpaper
                key={data._id}
                title={data.title}
                instructor={data.instructor}
                time={data.dateTime}
                key={data._id}
                id={data._id}
                rtmp={data.rtmp}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
