import React, { Component } from "react";
import axios from "axios";
import SubpaperC from "./subpaperC";
import Navbar from "./nav";
import Paper from "./paper";
import "../css/base.css";
import { BrowserRouter as route, Link } from "react-router-dom";
import { Grid, TextField } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Search } from "@material-ui/icons";

class TCourse extends Component {
  state = {
    id: this.props.match.params.tname,
    video: []
  };
  componentDidMount() {
    let id = this.state.id;
    console.log(id);
    this.setState({
      id: id
    });
    axios
      .post("/_api/getvideobyinstructor", {
        name: id
      })
      .then(res => {
        this.setState({
          video: res.data
        });
        console.log(this.state.video);
      })
      .catch(function(err) {});
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item>
            <Navbar />
          </Grid>
          <Grid item xs={11}>
            <div className="content">
              <div className="head-content">
                <div className="set-center">
                  <Link to="/course">
                    <ArrowBackIosIcon className="arrow" />
                  </Link>
                  <div id="Tpic"></div>
                  <h1 className="subhead">{this.state.id}</h1>
                </div>
              </div>
              <div>
                <div className="search">
                  <Grid container alignItems="flex-end">
                    <Grid item>
                      <Search />
                    </Grid>
                    <Grid item>
                      <TextField label="search" id="search" />
                    </Grid>
                  </Grid>
                </div>
                <Grid container spacing={6}>
                  <Grid item xs={6}>
                    <Paper live={this.state.video} head="รายวิชาที่เปิดสอน" />
                  </Grid>
                  <Grid item xs={6}>
                    <Paper live={this.state.video} head="วิดิโอทั้งหมด" />
                  </Grid>
                </Grid>
                {/* <Paper className="course-paper">
                  <Grid container>
                    <Grid item xs={6}>
                      {V}
                    </Grid>
                    <Grid item xs={6}>
                      yay2
                    </Grid>
                  </Grid>
                </Paper> */}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default TCourse;
