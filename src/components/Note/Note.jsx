import React, { Component } from "react";
import "./Note.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

class Note extends Component {
  state = {
    editedNote: this.props.note ? this.props.note : "",
    editable: false,
    sender: this.props.sender,
  };

  componentDidMount() {
    if (this.props.type == "newNote")
      this.setState({
        editable: true,
      });
  }

  handleChange = (event) => {
    if (event.target.value.charCodeAt(event.target.value.length - 1) == 10)
      return;
    if (event.target.value.length > 140) return;
    this.setState({
      editedNote: event.target.value,
    });
  };

  undoEdit = () => {
    if (this.props.type == "newNote") {
      this.setState({
        editedNote: "",
      });
    } else if (this.props.type == "privateNote") {
      this.setState({
        editedNote: this.props.note,
        editable: false,
      });
    }
  };

  saveNote = () => {
    if (this.props.type == "newNote") {
      this.props.addNote(this.state.editedNote);
      this.setState({
        editedNote: "",
      });
    } else if (this.props.type == "privateNote") {
      this.props.editNote(this.state.editedNote);
      this.setState({
        editable: false,
      });
    }
  };

  saveNoteOnEnter = (e) => {
    if (e.keyCode == 13) this.saveNote();
  };

  setEditableTrue = () => {
    this.setState({
      editable: true,
    });
  };

  render() {
    return (
      <div className="note">
        <div className="upperIcons">
          {/* style={this.state.hover?{visibility: "visible"}:{visibility: "hidden"}} */}
          {this.props.type == "newNote" ||
          this.props.type == "publicNote" ||
          this.state.editable ? (
            <></>
          ) : (
            <IosShareIcon
              id="sendNoteIcon"
              className="noteIcons"
              onClick={this.props.sendNote}
            />
          )}
          {this.props.type == "newNote" ||
          this.props.type == "publicNote" ||
          this.state.editable ? (
            <></>
          ) : (
            <DeleteForeverIcon
              id="deleteNoteIcon"
              className="noteIcons"
              onClick={this.props.deleteNote}
            />
          )}
        </div>
        <div className="text">
          <TextField
          className="noteText"
            placeholder="Start writing your note"
            multiline
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize:
                  this.state.editedNote.length < 50
                    ? "medium"
                    : this.state.editedNote.length < 100
                    ? "small"
                    : "x-small",
              },
            }}
            
            disabled={!this.state.editable} 
            variant="standard"
            onChange={(e) => this.handleChange(e)}
            value={this.state.editedNote}
            onKeyDown={this.saveNoteOnEnter}
          />
        </div>
        <div className="lowerIcons">
          {this.state.editable ? (
            <>
              <CheckCircleIcon
                className="noteIcons"
                id="saveNoteIcon"
                onClick={this.saveNote}
              />
              <CancelIcon
                className="noteIcons"
                id="cancelEditIcon"
                onClick={() => this.undoEdit()}
              />
            </>
          ) : (
            <></>
          )}
          {this.props.type == "newNote" || this.props.type == "publicNote" ? (
            <></>
          ) : this.props.type == "privateNote" && !this.state.editable ? (
            <ModeEditIcon
              className="noteIcons"
              onClick={this.setEditableTrue}
            />
          ) : (
            <></>
          )}
          {this.props.type == "publicNote" ? (
            <div className="senderName">{this.state.sender}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

export default Note;
