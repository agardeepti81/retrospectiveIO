import "./App.css";
import React, { Component } from "react";
import PublicNote from "./components/PublicNote";
import PrivateNote from "./components/PrivateNote";
import StartPage from "./components/StartPage";

const URL = "ws://localhost:8080";

class App extends Component {
  state = {
    socket: null,
    isStartPage: true,
    isConnected: false,
    members: [],
    notes: [],
  };

  // componentDidMount = () => {
  //   console.log(this.state.socket);
  //   if(this.state.socket!== null && this.state.socket?.readyState !== WebSocket.OPEN){
  //     alert("Session ended. You can connect again");
  //   }
  // }

  onSocketClose = () => {
    alert("Session ended. You can connect again");
  }

  onConnectApp = (username) => {
    this.onConnect(username);
  };

  onConnect = (username) => {
    if (this.state.socket?.readyState !== WebSocket.OPEN) {
      this.state.socket = new WebSocket(URL);
      this.state.socket.addEventListener("open", () =>
        this.onSocketOpen(username)
      );
      this.state.socket.addEventListener("message", (event) => {
        this.onSocketMessage(event.data);
      });
      this.state.socket.addEventListener("close", () => this.onSocketClose());
    }
  };

  onSocketOpen = (username) => {
    this.setState({
      isConnected: true,
    });
    this.state.socket?.send(
      JSON.stringify({
        action: "setName",
        name: username,
      })
    );
  };

  onSocketMessage = (dataStr) => {
    const data = JSON.parse(dataStr);
    switch (data?.type) {
      case "initialData":
        this.setState({
          members: data.members,
          notes: data.notes,
          isStartPage: false,
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

  sendNote = (newNote) => {
    this.state.socket?.send(
      JSON.stringify({
        action: "onNewNote",
        note: newNote,
      })
    );
  };

  render() {
    return (
      <div className="App">
        {this.state.isStartPage ? (
          <StartPage onConnect={this.onConnectApp} />
        ) : (
          <div>
            <PublicNote notes={this.state.notes} />
            <PrivateNote onSend={this.sendNote} />
            {this.state.members.map((member) => (
              <span>{member.name}</span>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default App;

