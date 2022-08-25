import React, { Component } from "react";
import Instance from "../Instance/Instance";
import { useParams } from "react-router-dom";
import "./SessionWindow.css";
import { Button, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const SessionWindowRoute = (props) => {
  const params = useParams();
  const { sessionID } = params;
  const [name, setName] = useState("");
  const [open, setOpen] = useState(true);
  // const [nameSubmit, setNameSubmit] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function validateName() {
    if(!name)
    alert("please enter your name");
    else 
    props.onConnectApp(name, sessionID);
  }


  if (!props.members) {
    return (
      <div>
        <Modal
          open={open}
        >
          <Box sx={style}>
            <h4 style={{textAlign: "left", marginBottom:10}}>Enter Name:</h4>
            <TextField
              id="outlined-required"
              size="small"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Button
              variant="contained"
              sx={{
                marginInline: 2
              }}
              onClick={() => {
                validateName(name);
                //setNameSubmit(true);
              }}
            >
              Join Session
            </Button>
          </Box>
        </Modal>
      </div>
    );
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
                <Button
                  id="addInstance"
                  variant="contained"
                  onClick={this.createNewInstance}
                >
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
