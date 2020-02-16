import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

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
    <div style={classes.root}>
      <Link to={props.go + props.id} style={classes.Link}>
        <div style={classes.testt}>
          <div item style={classes.video}></div>
          <div item style={classes.test}>
            <div style={classes.title}>title: {props.title}</div>
            <div style={classes.instructor}>instructor: {props.instructor}</div>
            {/* <div style={classes.instructor}>subject: {props.subject}</div> */}
            <div style={classes.time}>
              date: {new Date(props.time).toLocaleString().split(", ")[0]}
            </div>
            <div style={classes.time}>
              time: {new Date(props.time).toLocaleString().split(", ")[1]}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Subpaper;
