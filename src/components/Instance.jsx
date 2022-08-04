import React, { Component } from "react";
import PublicNote from "./PublicNote";
import PrivateNote from "./PrivateNote";

class Instance extends Component {
  state = {};
  render() {
    return (
      <div>
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
