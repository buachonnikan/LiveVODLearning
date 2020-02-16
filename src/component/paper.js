import React from "react";
import Paper from "@material-ui/core/Paper";
import Subpaper from "./subpaper";
import SubpaperC from "./subpaperC";
import { BrowserRouter as route, Link } from "react-router-dom";
import "../css/base.css";
// import { Link } from "react-router-dom";

function paper(props) {
  const classes = {
    containerVideo: {
      padding: "20px",
      position: "relative"
    },
    containerOverflow: {
      overflow: "auto",
      width: "auto",
      minHeight: "250px"
    }
  };
  const liveVideo = props.live.map(data => (
    <Subpaper
      title={data.title}
      instructor={data.instructor}
      time={data.dateTime}
      key={data._id}
      id={data._id}
      rtmp={data.rtmp}
    />
  ));
  const courseVideo = props.live.map(data => (
    <SubpaperC
      title={data.title}
      instructor={data.instructor}
      time={data.dateTime}
      key={data._id}
      id={data._id}
      rtmp={data.rtmp}
      back="/course"
      go="/course-video/"
    />
  ));
  const subjectCourse = props.live.map(data => (
    <Link className="tname" to={"/subject/" + data}>
      <div className="teacher-course">
        <div id="tpic" className="set-center">
          {data[0]}
        </div>
        <div>{data}</div>
      </div>
    </Link>
  ));
  return (
    <Paper className="paper-size">
      <div style={classes.containerVideo}>
        <p>{props.head}</p>
        <div style={classes.containerOverflow}>
          {props.type == "l"
            ? liveVideo
            : props.type == "sc"
            ? subjectCourse
            : courseVideo}
        </div>
      </div>
    </Paper>
  );
}

export default paper;
