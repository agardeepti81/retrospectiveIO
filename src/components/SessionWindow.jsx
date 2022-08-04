import React, { Component } from "react";
import PublicNote from "./PublicNote";
import PrivateNote from "./PrivateNote";
import { useParams } from "react-router-dom";

const SessionWindowRoute = (props) => {
  const params = useParams();
  const { sessionID } = params;

  return (
    <SessionWindow
      sessionID={sessionID}
      members={props.members}
      instances={props.instances}
      newInstance={props.newInstance}
    />
  );
};

class SessionWindow extends Component {
  state = {
    instanceName: "",
    notes: "",
  };

  handleChange = (event) => {
    this.setState({
      instanceName: event.target.value,
    });
  };

  render() {
    return (
      <div>
        Instance name:{" "}
        <input
          type="text"
          id="instanceName"
          placeholder="Instance Name"
          onChange={this.handleChange}
          value={this.state.instanceName}
        />
        <br></br>
        create new Instance:
        <button
          onClick={() =>
            this.props.newInstance(
              this.props.sessionID,
              this.state.instanceName
            )
          }
        >+</button>
        {/* <PublicNote notes={this.state.notes} />
        <PrivateNote onSend={this.sendNote} />
        {this.state.members.map((member) => (
          <span>{member.name}</span>
        ))} */}
      </div>
    );
  }
}

export default SessionWindowRoute;
