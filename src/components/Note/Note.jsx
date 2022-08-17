import React, { Component } from "react";
import "./Note.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { fontSize } from "@mui/system";

class Note extends Component {
  state = {
    editedNote: this.props.note ? this.props.note : "",
    editable: false,
  };

  handleChange = (event) => {
    if (event.target.value.length > 140) return;
    this.setState({
      editedNote: event.target.value,
    });
  };

  undoEdit = () => {
    this.setState({
      editedNote: "",
    });
  };

  render() {
    return (
      <div className="note">
        <div className="upperIcons">
          {this.props.type == "newNote" ? (
            <></>
          ) : (
            <IosShareIcon
              className="sendNoteIcon"
              onClick={() =>
                this.props.sendNote(
                  this.props.note,
                  this.props.sessionID,
                  this.props.instanceID
                )
              }
            />
          )}
          {this.props.type == "newNote" ? (
            <></>
          ) : (
            <DeleteForeverIcon
              className="deleteNoteIcon"
              onClick={() => this.props.deleteNote(this.props.note)}
            />
          )}
        </div>
        {/* <div
          className="text"
          contentEditable={this.props.isContentEditable}
          onInput={(e) => this.props.onChange(e)}
          style={{ fontSize: this.props.fontSize }}
        >
          {this.props.note}
        </div> */}
        <TextField
          className="text"
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
          variant="standard"
          onChange={(e) => this.handleChange(e)}
          value={this.state.editedNote}
        />
        <div className="lowerIcons">
          <CheckCircleIcon
            className="noteIcons"
            id="saveNoteIcon"
            onClick={() => {
              this.props.addNote(this.state.editedNote);
              this.setState({
                editedNote: ""
              })
            }}
          />
          <CancelIcon
            className="noteIcons"
            id="cancelEditIcon"
            onClick={() => this.undoEdit()}
          />
          {this.props.type == "newNote" ? (
            <></>
          ) : (
            <ModeEditIcon
              className="editNoteIcon"
              onClick={this.props.editContent}
            />
          )}
        </div>
        {/* <CancelIcon className="closeIcon" onClick={() => this.props.deleteNote(this.props.note)} /> */}
        {/* <IosShareIcon className="sendNoteIcon"/>
        <DeleteForeverIcon className="deleteNoteIcon"/>
        <ModeEditIcon className="editNoteIcon" />
        <CheckCircleIcon className="saveNoteIcon" />
        <div className="senderName" contentEditable="false">Se</div> */}

        {/* <button id="send"
          onClick={() =>
            this.props.sendNote(
              this.props.note,
              this.props.sessionID,
              this.props.instanceID
            )
          }
        >
          ok
        </button>
        {this.props.note} */}
      </div>
    );
  }
}

export default Note;
