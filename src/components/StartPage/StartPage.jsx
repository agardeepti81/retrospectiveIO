import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./StartPage.css";
import image from "./mainPage.png";

class StartPage extends Component {
  state = {
    name: "",
    meetingId: "",
  };

  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeMeeting = (event) => {
    this.setState({
      meetingId: event.target.value,
    });
  };

  render() {
    return (
      <div id="startPage">
        <div className="workingArea">
          <div className="ideatitle">Let's share our ideas#@!!</div>
          <div className="name">
            <TextField
              id="outlined-required"
              label="Name"
              size="small"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className="session">
            <div className="newSession">
              <Button
                variant="contained"
                onClick={() => this.props.onConnect(this.state.name)}
              >
                Start new Session
              </Button>
            </div>
            <div className="existingSession">
              <div className="sessionInput">
                <TextField
                  id="outlined-required"
                  label="session ID"
                  size="small"
                  onChange={this.handleChangeMeeting}
                  value={this.state.meetingId}
                />
              </div>
              <br></br>
              <div className="joinSession">
                <Button
                  variant="contained"
                  onClick={() =>
                    this.props.onConnect(this.state.name, this.state.meetingId)
                  }
                >
                  {" "}
                  Join session
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="displayArea">
          <img src={image} width={400} height={600} alt="" />
        </div>
        {this.props.sessionID ? (
          <Navigate to={`/${this.props.sessionID}`} />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default StartPage;
