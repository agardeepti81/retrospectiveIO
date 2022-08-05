import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import StartPage from "./components/StartPage/StartPage";
import SessionWindowRoute from "./components/SessionWindow/SessionWindow";

const URL = "ws://localhost:8080";

class App extends Component {
  state = {
    socket: null,
    members: null,
    instances: null,
    sessionID: null,
  };

  onSocketClose = () => {
    alert("Session ended. You can connect again");
  };

  onConnectApp = (username, sessionID) => {
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

  sendNote = (newNote, sessionID, instanceID) => {
    console.log(newNote, sessionID, instanceID)
    this.state.socket?.send(
      JSON.stringify({
        action: "onNewNote",
        note: newNote,
        sessionID: sessionID,
        instanceID: instanceID
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

  render() {
    return (
      <div className="App">
        <div className="navBar">
          <div className="title">Retrospective.io</div>
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
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
