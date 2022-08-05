import React, { Component } from "react";
import PublicNote from "../PublicNote";
import PrivateNote from "../PrivateNote";
import "./Instance.css"

class Instance extends Component {
  state = {};
  render() {
    console.log(this.props.instanceInfo);
    return (
      <div id="instance">
        <span id="Name">{this.props.instanceInfo.name}</span>
        <PublicNote
          instanceInfo={this.props.instanceInfo}
          members={this.props.members}
        />
        <PrivateNote
          instanceInfo={this.props.instanceInfo}
          members={this.props.members}
          sessionID={this.props.sessionID}
          instanceID={this.props.instanceID}
          sendNote={this.props.sendNote}
        />
      </div>
    );
  }
}

export default Instance;
