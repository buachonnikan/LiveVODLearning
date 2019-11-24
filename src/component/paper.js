import React from "react";
import Paper from "@material-ui/core/Paper";
import Subpaper from "./subpaper";
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
  const mockData = [
    { title: "test1", instructor: "name1", time: "11.00-12.00", id: 1 },
    { title: "test2", instructor: "name2", time: "13.00-14.00", id: 2 },
    { title: "test3", instructor: "name3", time: "13.00-14.00", id: 3 },
    { title: "test4", instructor: "name4", time: "13.00-14.00", id: 4 },
    { title: "test5", instructor: "name5", time: "13.00-14.00", id: 5 },
    { title: "test6", instructor: "name6", time: "13.00-14.00", id: 6 }
  ];
  const mock = props.live.map(data => (
    <Subpaper
      title={data.title}
      instructor={data.instructor}
      time={data.dateTime}
      key={data._id}
      id={data._id}
      rtmp={data.rtmp}
    />
  ));
  return (
    <Paper style={classes.paper}>
      <div style={classes.containerVideo}>
        <p>กำลังถ่ายทอดสดอยู่ในขณะนี้</p>
        <div style={classes.containerOverflow}>{mock}</div>
      </div>
    </Paper>
  );
}

export default paper;
