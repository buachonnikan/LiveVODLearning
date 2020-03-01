import React, { Component } from "react";
import Teacher from "./teacher";

class TCourse extends Component {
  state = {
    id: this.props.match.params.tname,
    video: [],
    subject: []
  };
  componentDidMount() {
    let id = this.state.id;
    console.log(id);
    this.setState({
      id: id
    });
  }

  render() {
    return (
      <div>
        <Teacher name={this.state.id} />
      </div>
    );
  }
}

export default TCourse;
