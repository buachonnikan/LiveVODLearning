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
  },
  paper: {
    width: "100%",
    height: "50vh",
    minHeight: "350px",
    padding: "20px",
    overflow: "auto"
  },
  search: {
    marginBottom: "20px"
  }
});
const mockData = [
  { title: "test1", instructor: "name1", time: "11.00-12.00", id: 1 },
  { title: "test2", instructor: "name2", time: "13.00-14.00", id: 2 },
  { title: "test3", instructor: "name3", time: "13.00-14.00", id: 3 },
  { title: "test4", instructor: "name4", time: "13.00-14.00", id: 4 },
  { title: "test5", instructor: "name5", time: "13.00-14.00", id: 5 },
  { title: "test6", instructor: "name6", time: "13.00-14.00", id: 6 }
];

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
            <div className={classes.box}>
              <Link to="/home">
                <ArrowBackIosIcon className={classes.arrow} />
              </Link>
              <h1 className="head">COURSE</h1>
            </div>
            <div>
              <div className={classes.search}>
                <Grid container alignItems="flex-end">
                  <Grid item>
                    <Search />
                  </Grid>
                  <Grid item>
                    <CssTextField label="search" id="search" />
                  </Grid>
                </Grid>
              </div>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={6}>
                    {Video}
                  </Grid>
                  <Grid item xs={6}>
                    yay2
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Course;
