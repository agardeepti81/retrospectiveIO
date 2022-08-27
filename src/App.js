import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import StartPage from "./components/StartPage/StartPage";
import SessionWindowRoute from "./components/SessionWindow/SessionWindow";
import PeopleIcon from "@mui/icons-material/People";
import { Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import mainLogo from "./Reflexion.png";
import sakhiLogo from "./sakhi_logo_tr.png";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

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
    participantsWindow: false,
    peopleIconVisible: true,
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

  onConnect = (username, sessionID, peopleIcon) => {
    this.setState({ peopleIconVisible: peopleIcon });
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
    if (typeof dataStr !== "string") {
      let pdfBlob = new Blob([dataStr], { type: "application/pdf" });
      let url = window.webkitURL.createObjectURL(pdfBlob);
      window.open(url);
      return;
    }
    const data = JSON.parse(dataStr);
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
        newMembers[Object.keys(data.memberInfo)[0]] = Object.values(
          data.memberInfo
        )[0];
        this.setState({
          members: newMembers,
        });
        alert(`${Object.values(data.memberInfo)[0]} has joined the session`);
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

      // case "pdfCreated":
      //   console.log(data.pdfStream);
      //   const stream = new pdfStream(data.pdfStream);

      //   const fileURL = window.URL.createObjectURL(stream);
      //   // Setting various property values
      //   let alink = document.createElement("a");
      //   alink.href = fileURL;
      //   alink.download = "SamplePDF.pdf";
      //   alink.click();

      //   let pdfBlob = new Blob([data.pdfStream], { type: "application/pdf" });
      //   let url = window.webkitURL.createObjectURL(pdfBlob);
      //   window.open(url);

      //   break;

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

  tooggleParticipantWindow = (updatedState) => {
    this.setState({
      participantsWindow: updatedState,
    });
  };

  createPDf = (id) => {
    console.log(this.state.instances);
    this.state.socket?.send(
      JSON.stringify({
        action: "createPDF",
        sessionID: id,
      })
    );
  };

  render() {
    return (
      <div className="App">
        <div className="navBar">
          <div className="title">
            <a href="http://sakhilearning.com/" target="_blank">
              <img src={sakhiLogo} width={65} height={65} />
            </a>
            <img src={mainLogo} />
          </div>
          <div className="empty"></div>
          {!this.state.peopleIconVisible ? (
            <div className="members">
              <FileDownloadIcon
                sx={{ color: "white" }}
                onClick={() => this.createPDf(this.state.sessionID)}
              />
            </div>
          ) : (
            <></>
          )}
          {!this.state.peopleIconVisible ? (
            <div className="members">
              <PeopleIcon
                sx={{ color: "white" }}
                onClick={() => this.tooggleParticipantWindow(true)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <Modal
          open={this.state.participantsWindow}
          onClose={() => this.tooggleParticipantWindow(false)}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                Member List:
                {this.state.members &&
                  Object.values(this.state.members).map((value) => (
                    <ListItem key={value} disableGutters>
                      <ListItemText primary={` ${value}`} />
                    </ListItem>
                  ))}
              </List>
            </Typography>
          </Box>
        </Modal>
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
