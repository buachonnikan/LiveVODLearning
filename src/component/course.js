import React, { useEffect, useState } from "react";
import { BrowserRouter as route, Link } from "react-router-dom";
import Navbar from "./nav";
import { Paper, Grid, TextField } from "@material-ui/core";
import "../css/base.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Search } from "@material-ui/icons";
import { black } from "@material-ui/core/colors";
import {
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import SubpaperC from "./subpaperC";
import axios from "axios";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black"
    }
  }
})(TextField);
const useStyles = makeStyles({
  arrow: {
    width: "40px",
    height: "auto",
    color: "black"
  }
});

const Course = () => {
  const classes = useStyles();
  const [video, setVideo] = useState([]);
  useEffect(() => {
    axios
      .get("/_api/getall")
      .then(res => {
        setVideo(res.data);
      })
      .catch(err => {});
  }, []);
  const Video = video.map(data => (
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
    <div>
      <Grid container>
        <Grid item>
          <Navbar />
        </Grid>
        <Grid item xs={11}>
          <div className="content">
            <div className="head-content">
              <div>
                <Link to="/home">
                  <ArrowBackIosIcon className={classes.arrow} />
                </Link>
                <h1 className="head">COURSE</h1>
              </div>
              <div className="filter">
                <Link to="/teacher-list">
                  <button class="filter_but" id="filter_t">
                    อาจารย์ผู้สอน
                  </button>
                </Link>
                <Link to="/subject-list">
                  <button class="filter_but" id="filter_s">
                    รายชื่อวิชา
                  </button>
                </Link>
              </div>
            </div>
            <div>
              <div className="search">
                <Grid container alignItems="flex-end">
                  <Grid item>
                    <Search />
                  </Grid>
                  <Grid item>
                    <CssTextField label="search" id="search" />
                  </Grid>
                </Grid>
              </div>
              <Paper className="course-paper">
                {Video}
                {/* <div className="cp">{Video}</div> */}
              </Paper>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Course;
