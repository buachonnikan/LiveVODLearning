import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "../css/subpaper.css";

function Subpaper(props) {
  const classes = {
    root: {
      marginBottom: "30px"
    },
    testt: {
      display: "flex"
    },
    video: {
      background: "gray",
      width: "150px",
      height: "100px",
      display: "inline-block"
    },
    title: {
      width: "auto"
    },
    instructor: {
      width: "100%"
    },
    time: {
      width: "100%"
    },
    Link: {
      textDecoration: "none",
      color: "black"
    }
  };
  return (
    <div className="root">
      <Link to={props.go + props.id} className="Link">
        <Grid container>
          <Grid item className="video">
            <img
              src={"/_livevod/" + props.id + "/thumbnail.png"}
              className="video"
            />
          </Grid>
          <Grid item xs={1} className="nor"></Grid>
          <Grid item>
            <div className="title">title: {props.title}</div>
            <div className="title">subject: {props.subject}</div>
            <div className="instructor">instructor: {props.instructor}</div>
            <div className="time">
              date: {new Date(props.time).toLocaleString().split(", ")[0]}
            </div>
            <div className="time">
              time: {new Date(props.time).toLocaleString().split(", ")[1]}
            </div>
          </Grid>
        </Grid>
      </Link>
    </div>
  );
}

export default Subpaper;
