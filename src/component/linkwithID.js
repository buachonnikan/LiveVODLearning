import React, { Component } from "react";

class ID extends Component {
  state = {
    id: null
  };
  componentDidMount() {
    let id = this.props.match.params.post_id;
    this.setState({
      id: id
    });
  }
  render() {
    return <p>{this.state.id}</p>;
  }
}

export default ID;
