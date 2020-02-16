import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Schedule from "./schedule";
import Grid from "@material-ui/core/Grid";
import "../css/base.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { LoggedContext } from "../context/LoggedContext";
import userr from "./checkType";

const useStyles = makeStyles({
  paper: {
    height: "65vh"
  },
  border: {
    border: "5px solid pink"
  }
});

const LoggedInHome = () => {
  const classes = useStyles();
  const [live, setLive] = useState([]);
  const { isLogged, setLogged, user, setUser, sent } = useContext(
    LoggedContext
  );
  useEffect(() => {
    if (sent) {
      if (isLogged) {
        if (user.type !== "t") {
          window.location = "/401";
        }
      } else {
        window.location = "/401";
      }
    }

    userr
      .axiosAuthen()
      .get("/_api/getliveinstructor")
      .then(res => {
        setLive(res.data);
        console.log(res.data);
      })
      .catch(err => {});
  }, []);

  return (
    <div>
      <div>
        <div>
          <div className="content">
            <div>
              <Link to="/home">
                <ArrowBackIosIcon id="arrow" />
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
        </div>
      </div>
    </div>
  );
};

export default LoggedInHome;
