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
  search: {
    marginBottom: "20px"
  }
});

const TList = () => {
  const classes = useStyles();
  const [instructor, setInstructor] = useState([]);
  useEffect(() => {
    axios
      .get("/_api/getinstructor")
      .then(res => {
        setInstructor(res.data);
      })
      .catch(err => {});
  }, []);
  const name = instructor.map(data => (
    <Link className="tname" to={"/teacher/" + data.name}>
      <div className="teacher-course">
        <div id="tpic" className="set-center">
          {data.name[0]}
        </div>
        <div>{data.name}</div>
      </div>
    </Link>
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
                <Link to="/course">
                  <ArrowBackIosIcon className={classes.arrow} />
                </Link>
                <h1 className="subhead">รายชื่ออาจารย์ผู้สอน</h1>
              </div>
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
              <Paper className="course-paper">
                {instructor.length > 5 ? (
                  <div className="testt">{name}</div>
                ) : (
                  <div>{name}</div>
                )}
              </Paper>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TList;
