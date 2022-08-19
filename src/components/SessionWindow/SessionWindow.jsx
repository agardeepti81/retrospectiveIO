import React, { Component } from "react";
import Instance from "../Instance/Instance";
import { useParams } from "react-router-dom";
import "./SessionWindow.css";
import {Button, Fab, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const SessionWindowRoute = (props) => {
  const params = useParams();
  const { sessionID } = params;
  let name;
  
  if(sessionID && !props.members)
  {
    name = prompt("Enter Name", "");
    if(name!=null)
    props.onConnectApp(name,sessionID);
  }

  return (
    <SessionWindow
      sessionID={sessionID}
      members={props.members}
      instances={props.instances}
      newInstance={props.newInstance}
      sendNote={props.sendNote}
      deleteInstance={props.deleteInstance}
    />
  );
};

class SessionWindow extends Component {
  state = {
    instanceName: "",
    notes: "",
    createInsanceClicked: false,
  };

  handleChange = (event) => {
    this.setState({
      instanceName: event.target.value,
    });
  };

  toggleInstanceModel = () => {
    this.setState({
      createInsanceClicked: !this.state.createInsanceClicked,
    });
  };

  createNewInstance = () => {
    if (this.state.instanceName == "") {
      alert("Please enter instance Name");
      return;
    }
    this.props.newInstance(this.props.sessionID, this.state.instanceName);
    this.setState({
      createInsanceClicked: false,
      instanceName: "",
    });
  };

  render() {
    console.log(Object.keys(this.props.instances));
    return (
      <div id="sessionWindow">
        {Object.keys(this.props.instances).map((instanceID) => (
          <Instance
            instanceID={instanceID}
            instanceInfo={this.props.instances[instanceID]}
            sendNote={this.props.sendNote}
            members={this.props.members}
            sessionID={this.props.sessionID}
            deleteInstance={this.props.deleteInstance}
          />
        ))}
        <div id="createInstance">
          <div id="button">
            {this.state.createInsanceClicked ? (
              <Fab
                size="large"
                color="primary"
                aria-label="edit"
                onClick={this.toggleInstanceModel}
              >
                <CloseIcon />
              </Fab>
            ) : (
              <Fab
                size="large"
                color="primary"
                aria-label="edit"
                onClick={this.toggleInstanceModel}
              >
                <AddIcon />
              </Fab>
            )}
            {this.state.createInsanceClicked ? (
              <div id="instanceName">
                <TextField
                  id="outlined-basic"
                  label="Instance name"
                  variant="outlined"
                  onChange={this.handleChange}
                  value={this.state.instanceName}
                  size="small"
                />
                <Button id="addInstance" variant="contained" onClick={this.createNewInstance}>
                  Add
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SessionWindowRoute;
