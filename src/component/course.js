import React from "react";
import { BrowserRouter as route, Link } from "react-router-dom";
import Navbar from "./nav";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "../css/base.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  arrow: {
    width: "40px",
    height: "auto",
    color: "black"
  }
});
// class Course extends Component {
const Course = () => {
  const classes = useStyles();
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
            <p>yay</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Course;
