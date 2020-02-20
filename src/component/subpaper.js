import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "../css/subpaper.css";

function Subpaper(props) {
  return (
    <div className="root">
      <Link to={"/video/" + props.id} className="Link">
        <Grid container>
          <Grid item className="video"></Grid>
          <Grid item xs={1} className="nor"></Grid>
          <Grid item>
            <div className="title">title: {props.title}</div>
            <div className="instructor">instructor: {props.instructor}</div>
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
