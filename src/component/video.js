import React, { Component } from "react";
import axios from "axios";
import Navbar from "./nav";
import Grid from "@material-ui/core/Grid";
import Base from "../css/base.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { BrowserRouter as Route, Link } from "react-router-dom";
import VideoSource from "./videoSource";
import { Player } from "video-react";
import "../../node_modules/video-react/dist/video-react.css";

class Video extends Component {
  state = {
    id: this.props.match.params.streamkey,
    live: {
      title: "",
      instructor: "",
      subject: "",
      dateTime: "",
      description: "",
      files: []
    }
  };
  componentDidMount() {
    let id = this.state.id;
    console.log(id);
    this.setState({
      id: id
    });
    axios
      .post("/_api/getbyid", {
        id: id
      })
      .then(res => {
        this.setState({
          live: res.data
        });
        console.log(this.state.live);
      })
      .catch(function(err) {
        // console.log(err);
      });
  }

  render() {
    // const classes = {
    //   root: {
    //     marginBottom: "30px"
    //   },
    //   video: {
    //     background: "gray",
    //     width: "150px",
    //     height: "100px",
    //     display: "inline-block"
    //   },
    //   title: {
    //     width: "auto"
    //   },
    //   instructor: {
    //     width: "100%"
    //   },
    //   time: {
    //     width: "100%"
    //   },
    //   Link: {
    //     textDecoration: "none",
    //     color: "black"
    //   },
    //   container: {
    //     padding: "50px",
    //     background: "green"
    //   }
    // };
    const title = this.state.live.title;
    const instructor = this.state.live.instructor;
    return (
      <Grid container>
        <Grid item>
          <Navbar />
        </Grid>
        <Grid item xs={7} className="content">
          <div className="head-video">
            <Link to="/live">
              <ArrowBackIosIcon className="arrow" />
            </Link>
            {this.state.live.title}
          </div>
          <div className="description">
            Instructor : {this.state.live.instructor}
          </div>
          <div className="description">Subject: {this.state.live.subject}</div>
          <Player fluid={false} width={800} playsInline>
            <VideoSource
              isVideoChild
              src={
                "http://158.108.231.138/_livevod/" +
                this.state.id +
                "/index.m3u8"
              }
            />
          </Player>
          <div className="description">ID: {this.state.id}</div>
          <div className="description">{this.state.live.description}</div>
          {this.state.live.files.map(l => (
            <a
              href={"http://158.108.231.138/files/" + l.name}
              download={l.name.split("-")[1]}
            >
              {l.name.split("-")[1]}
            </a>
          ))}
        </Grid>
        <Grid item className="chat">
          <div className="for-chat">chit-chat ja </div>
        </Grid>
      </Grid>
    );
  }
}

export default Video;
