import React, { Component } from "react";
import "./PrivateNote.css";
import Note from "../Note/Note";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Tooltip } from "@mui/material";

class PrivateNote extends Component {
  state = {
    allNotes: [],
  };

  addNote = (note) => {
    let notes = this.state.allNotes;
    notes.push(note);
    this.setState({
      allNotes: notes,
    });
  };

  editNote = (updatedNote, noteIndex) => {
    let updatedNotes = this.state.allNotes;
    updatedNotes[noteIndex] = updatedNote;
    this.setState({
      allNotes: updatedNotes,
    });
  };

  deleteNote = (deleteNoteIndex) => {
    let updatedNotes = this.state.allNotes;
    if (deleteNoteIndex !== -1) {
      updatedNotes.splice(deleteNoteIndex, 1);
    }
    this.setState({
      allNotes: updatedNotes,
    });
  };

  render() {
    return (
      <div class="privateNote">
        <div className="publishAll">
          <Tooltip title="Send All" placement="bottom">
            <KeyboardDoubleArrowUpIcon
              variant="text"
              onClick={() => {
                this.state.allNotes.map((note) =>
                  this.props.sendNote(note, this.props.instanceID)
                );
                this.setState({
                  allNotes: [],
                });
              }}
            >
              Publish All
            </KeyboardDoubleArrowUpIcon>
          </Tooltip>
        </div>
        <div className="notesSpace">
          {this.state.allNotes.map((note, i) => (
            <Note
              note={note}
              type="privateNote"
              sendNote={() => {
                this.props.sendNote(note, this.props.instanceID);
                this.deleteNote(i);
              }}
              deleteNote={() => this.deleteNote(i)}
              editNote={(updatedNote) => this.editNote(updatedNote, i)}
            />
          ))}
          <Note type="newNote" addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default PrivateNote;
