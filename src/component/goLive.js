import React, { useEffect, useState } from "react";
import axios from "axios";
import Schedule from "./schedule";
import Navbar from "./nav";
import Grid from "@material-ui/core/Grid";
import Base from "../css/base.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  arrow: {
    width: "40px",
    height: "auto",
    color: "black"
  },
  paper: {
    height: "65vh"
  },
  border: {
    border: "5px solid pink"
  },
  test: {
    // height: "1000px",
    background: "pink"
  }
});

const LoggedInHome = () => {
  const classes = useStyles();
  const [live, setLive] = useState([]);
  useEffect(() => {
    axios
      .get("/_api/getliveinstructor")
      .then(res => {
        setLive(res.data);
        console.log(res.data);
      })
      .catch(err => {
        // setError(err.message);
        // setLoad(true);
      });
  }, []);
  return (
    <div>
      <Grid container>
        <Grid item>
          <Navbar />
        </Grid>
        <Grid item xs={11}>
          <div className="content">
            <div>
              <Link to="/home">
                <ArrowBackIosIcon className={classes.arrow} />
              </Link>
              <h1 className="head">GO LIVE!</h1>
            </div>
            <div>
              <Grid container spacing={6}>
                <Grid item xs={6} className="startbut">
                  <Link to="/form">
                    <button className="startlive">
                      START
                      <br />
                      LIVE
                    </button>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Schedule live={live} t="true" />
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoggedInHome;
