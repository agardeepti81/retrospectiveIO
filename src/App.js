import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import StartPage from "./components/StartPage/StartPage";
import SessionWindowRoute from "./components/SessionWindow/SessionWindow";
import PeopleIcon from "@mui/icons-material/People";
import { Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import MemberList from "./components/MemberList/MemberList";

const URL = "ws://localhost:8080";
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

class App extends Component {
  state = {
    socket: null,
    members: null,
    instances: null,
    sessionID: null,
    createInstances: 0,
    openmodal: true,
  };

  onSocketClose = () => {
    alert("Session ended. You can connect again");
  };

  onConnectApp = (username, sessionID) => {
    if (!sessionID) {
      this.setState({ createInstances: 1 });
    }
    this.onConnect(username, sessionID);
  };

  onConnect = (username, sessionID) => {
    this.state.socket = new WebSocket(URL);
    this.state.socket.addEventListener("open", () =>
      this.onSocketOpen(username, sessionID)
    );
    this.state.socket.addEventListener("message", (event) => {
      this.onSocketMessage(event.data);
    });
    this.state.socket.addEventListener("close", () => this.onSocketClose());
  };

  onSocketOpen = (username, sessionID) => {
    this.state.socket?.send(
      JSON.stringify({
        action: "setNameAndSession",
        name: username,
        sessionID,
      })
    );
  };

  onSocketMessage = (dataStr) => {
    const data = JSON.parse(dataStr);
    console.log(data);
    switch (data?.type) {
      case "wrongSessionID":
        alert(
          "Incorrect sessionID. Join with a correct one or start a new session."
        );
        break;
      case "initialData":
        this.setState({
          members: data.members,
          instances: data.instances,
          sessionID: data.sessionID,
        });
        for (let i = 0; i < this.state.createInstances; i++) {
          this.createNewInstance(data.sessionID, "start");
        }
        break;
      case "newMember":
        let newMembers = this.state.members;
        console.log(newMembers);
        newMembers.push(data.memberInfo);
        console.log(newMembers);
        this.setState({
          members: newMembers,
        });
        alert(`${data.memberInfo.name} has joined the session`);
        break;

      case "updatedInstancesData":
        this.setState({
          instances: data.instance,
        });
        break;

      case "newNote":
        let newNotes = this.state.notes;
        console.log(newNotes);
        newNotes.push(data.note);
        console.log(newNotes);
        this.setState({
          notes: newNotes,
        });
        break;

      case "memberLeft":
        alert(data.uid + " has left the session");
        this.setState({
          members: this.state.members.filter(
            (member) => member.uid !== data.uid
          ),
        });
        break;

      default:
        console.log(data);
    }
  };

  sendNote = (newNote, instanceID) => {
    console.log(newNote, instanceID);
    this.state.socket?.send(
      JSON.stringify({
        action: "onNewNote",
        note: newNote,
        sessionID: this.state.sessionID,
        instanceID: instanceID,
      })
    );
  };

  createNewInstance = (id, name) => {
    this.state.socket?.send(
      JSON.stringify({
        action: "createNewInstance",
        sessionID: id,
        instanceName: name,
      })
    );
  };

  deleteInstance = (instanceID, sessionID) => {
    this.state.socket?.send(
      JSON.stringify({
        action: "deleteInstance",
        instanceID: instanceID,
        sessionID: sessionID,
      })
    );
  };

  showMembers = () => {
    alert("Members: "+Object.entries(this.state.members).map(i=>i[1]));
    return (
      Object.entries(this.state.members).map((i) => (
        <div>
          <MemberList/>
          {/* <Modal open={this.state.openmodal}>
            <Box sx={style}>
              <Typography variant="h6" component="h2">{i[1]}</Typography>
            </Box>
          </Modal> */}
        </div>
      ))
    );
  };

  render() {
    return (
      <div className="App">
        <div className="navBar">
          <div className="title">Retrospective.io</div>
          <div className="empty"></div>
          <div className="members">
            <PeopleIcon onClick={this.showMembers} />
          </div>
        </div>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <StartPage
                onConnect={this.onConnectApp}
                sessionID={this.state.sessionID}
              />
            }
          />
          <Route
            exact
            path="/:sessionID"
            element={
              <SessionWindowRoute
                members={this.state.members}
                instances={this.state.instances}
                newInstance={this.createNewInstance}
                sendNote={this.sendNote}
                deleteInstance={this.deleteInstance}
                onConnectApp={this.onConnectApp}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
