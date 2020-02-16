import React, { Component } from "react";
import axios from "axios";
import Navbar from "./nav";
import Grid from "@material-ui/core/Grid";
import "../css/base.css";
import "../css/schedule.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { BrowserRouter as Route, Link } from "react-router-dom";
import VideoSource from "./videoSource";
import { Player } from "video-react";
import Chat from "./chat";
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
  handleChange(event) {
    const { chat, value } = event.target;
    this.setState({
      [chat]: value
    });
  }
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
    const title = this.state.live.title;
    const instructor = this.state.live.instructor;
    return (
      <Grid container style={{ height: "100%" }}>
        <Grid item>
          <Navbar />
        </Grid>
        <Grid item xs={7} className="content-v">
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
            {/* <Player playInline> */}
            <VideoSource
              isVideoChild
              src={
                "http://10.2.145.29/_livevod/" + this.state.id + "/index.m3u8"
              }
            />
          </Player>
          <div className="description">ID: {this.state.id}</div>
          <div className="description">
            Description: {this.state.live.description}
          </div>
          Attachment:
          {this.state.live.files.map(l => (
            <a
              href={"http://10.2.145.29/files/" + l.name}
              download={l.name.split("-")[1]}
            >
              {l.name.split("-")[1]}
            </a>
          ))}
        </Grid>
        <Grid item xs={4} className="chat">
          <Chat room={this.state.id} />
        </Grid>
      </Grid>
    );
  }
}

export default Video;
