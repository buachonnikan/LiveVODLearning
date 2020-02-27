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

const List = props => {
  const classes = useStyles();
  return (
    <div>
      <div>
        <div>
          <div className="content">
            <div className="head-content">
              <div>
                <Link to={{ pathname: "/course", state: { detail: null } }}>
                  <ArrowBackIosIcon className={classes.arrow} />
                </Link>
                <h1 className="subhead">{props.head}</h1>
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
                {props.list.length > 5 ? (
                  <div className="testt">{props.list}</div>
                ) : (
                  <div>{props.list}</div>
                )}
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
