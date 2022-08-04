import React, { Component } from "react";
import Instance from "./Instance";
import { Navigate, useParams } from "react-router-dom";

const SessionWindowRoute = (props) => {
  const params = useParams();
  const { sessionID } = params;

  return (
    <SessionWindow
      sessionID={sessionID}
      members={props.members}
      instances={props.instances}
      newInstance={props.newInstance}
      sendNote={props.sendNote}
    />
  );
};

class SessionWindow extends Component {
  state = {
    instanceName: "",
    notes: ""
  };

  handleChange = (event) => {
    this.setState({
      instanceName: event.target.value,
    });
  };

  render() {
    console.log(Object.keys(this.props.instances));
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
        >
          +
        </button>
        {Object.keys(this.props.instances).map((instanceID) => (
          <Instance 
          instanceID={instanceID} 
          instanceInfo={this.props.instances[instanceID]} 
          sendNote={this.props.sendNote}
          members={this.props.members}
          sessionID={this.props.sessionID}/>
        ))}
      </div>
    );
  }
}

export default SessionWindowRoute;
