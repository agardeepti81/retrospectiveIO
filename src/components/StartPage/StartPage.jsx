import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import "./StartPage.css";
import image from "./mainPage.png";
import orImage from "./orImage.png";

class StartPage extends Component {
  state = {
    name: "",
    meetingId: "",
    peopleIcon: false
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

  validateName = () =>{
    if(!this.state.name)
    alert("please enter your name");
    else if(!this.state.meetingId)
      this.props.onConnect(this.state.name, this.props.sessionID, this.state.peopleIcon)
    else 
      this.props.onConnect(this.state.name, this.state.meetingId, this.state.peopleIcon)
  }

  render() {
    return (
      <div id="startPage">
        <div className="workingArea">
          <div className="ideatitle">Create better future by learning from past!!</div>
          <div className="name">
            <TextField
              id="outlined-required"
              label="Tell me your name"
              size="small"
              sx={{width: '50ch' }}
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className="session">
            <div className="newSession">
              <Button
                variant="contained"
                onClick={this.validateName}
                // () => this.props.onConnect(this.state.name, this.props.sessionID)
              >
                Start new Session
              </Button>
            </div>
            <div><img src={orImage} /></div>
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
                  onClick={this.validateName}
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
