import React, { Component } from "react";
import axios from "axios";
import SubpaperC from "./subpaperC";
import "../css/base.css";
import Subject from "./subject";

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
  }

  render() {
    return <Subject name={this.state.id} />;
  }
}

export default SCourse;
