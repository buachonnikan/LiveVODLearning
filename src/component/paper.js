import React from "react";
import Paper from "@material-ui/core/Paper";
import Subpaper from "./subpaper";
import SubpaperC from "./subpaperC";
// import { Link } from "react-router-dom";

function paper(props) {
  const classes = {
    paper: {
      height: "65vh"
    },
    containerVideo: {
      padding: "20px",
      position: "relative"
    },
    containerOverflow: {
      overflow: "auto",
      width: "auto",
      height: "51vh"
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
  return (
    <Paper style={classes.paper}>
      <div style={classes.containerVideo}>
        <p>{props.head}</p>
        <div style={classes.containerOverflow}>
          {props.type == "l" ? liveVideo : courseVideo}
        </div>
      </div>
    </Paper>
  );
}

export default paper;
