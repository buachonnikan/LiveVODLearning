import React, { createContext, Component } from "react";
export const EditContext = createContext();

class EditContextProvider extends Component {
  state = {
    isFinish: false
  };
  toggleEdit = () => {
    this.setState({ isFinish: !this.state.isFinish });
  };
  render() {
    return (
      <EditContext.Provider
        value={{ ...this.state, toggleEdit: this.toggleEdit }}
      >
        {this.props.children}
      </EditContext.Provider>
    );
  }
}

export default EditContextProvider;
