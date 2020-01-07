import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Route, Link } from "react-router-dom";
import Navbar from "./nav";
import Grid from "@material-ui/core/Grid";
import Base from "../css/base.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "./paper";
import ScheduleLive from "./schedule-live";

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

const Live = () => {
  const classes = useStyles();
  const [livee, setLive] = useState([]);
  const [now, setNow] = useState([]);

  useEffect(() => {
    axios
      .get("/_api/getlivetoday")
      .then(res => {
        setLive(res.data);
      })
      .catch(err => {
        // setError(err.message);
        // setLoad(true);
      });
    axios
      .get("/_api/getlivenow")
      .then(res => {
        setNow(res.data);
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
              {/* <h1 className="head">LIVE</h1> */}
              <div className="head">LIVE</div>
            </div>
            <div>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <Paper live={now} />
                </Grid>
                <Grid item xs={6}>
                  <ScheduleLive live={livee} />
                  {/* เอาinstructorมาด้วย */}
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Live;
