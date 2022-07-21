import React, { Component } from "react";

class StartPage extends Component {
  state = {
    name: "",
  };

  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  render() {
    return (
      <div id="startPage">
        <h4>Start Session</h4>
        Name:{" "}
        <input
          type="text"
          id="user"
          placeholder="Enter Your Name"
          onChange={this.handleChange}
          value={this.state.name}
        />
        <br></br>
        <br></br>
        <button onClick={() => this.props.onConnect(this.state.name)}>
          Join
        </button>
      </div>
    );
  }
}

export default StartPage;
