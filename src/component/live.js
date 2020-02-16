import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Route, Link } from "react-router-dom";
import Navbar from "./nav";
import Grid from "@material-ui/core/Grid";
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
        setNow(res.data);
      })
      .catch(err => {});
  }, []);

  return (
    <div>
      <div className="content">
        <div>
          <Link to="/home">
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
        <div className="r">
          <div className="r-live-part">
            <Subpaper
              title={"title"}
              instructor={"instructor"}
              time={"dateTime"}
              key={"id"}
              id={"id"}
              rtmp={"rtmp"}
            />
            <Subpaper
              title={"title"}
              instructor={"instructor"}
              time={"dateTime"}
              key={"id"}
              id={"id"}
              rtmp={"rtmp"}
            />
            <Subpaper
              title={"title"}
              instructor={"instructor"}
              time={"dateTime"}
              key={"id"}
              id={"id"}
              rtmp={"rtmp"}
            />
            {/* {now.map(data => (
            <Subpaper
              title={data.title}
              instructor={data.instructor}
              time={data.dateTime}
              key={data._id}
              id={data._id}
              rtmp={data.rtmp}
            />
          ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
