import React, { Component } from "react";
import axios from "axios";
import SubpaperC from "./subpaperC";
import Navbar from "./nav";
import "../css/base.css";
import { BrowserRouter as route, Link } from "react-router-dom";
import { Paper, Grid, TextField } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Search } from "@material-ui/icons";

class SCourse extends Component {
  state = {
    id: this.props.match.params.sname,
    video: []
  };
  componentDidMount() {
    let id = this.state.id;
    this.setState({
      id: id
    });
    axios
      .post("/_api/getvideobysubject", {
        subject: id
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          video: res.data
        });
        // console.log(this.state.video);
      })
      .catch(function(err) {});
  }

  render() {
    const Video = this.state.video.map(data => (
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
                  <Paper className="course-paper">{Video}</Paper>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SCourse;
