import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

function Subpaper(props) {
  const classes = {
    root: {
      marginBottom: "30px"
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
      <Link to={"/course-video/" + props.id} style={classes.Link}>
        <Grid container>
          <Grid item style={classes.video}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item style={classes.test}>
            <div style={classes.title}>title: {props.title}</div>
            <div style={classes.instructor}>instructor: {props.instructor}</div>
            <div style={classes.time}>
              time: {new Date(props.time).toLocaleString().split(", ")[1]}
            </div>
          </Grid>
        </Grid>
      </Link>
    </div>
  );
}

export default Subpaper;
