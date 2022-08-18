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
                  allNotes: []
                })
              }}
            >
              Publish All
            </KeyboardDoubleArrowUpIcon>
          </Tooltip>
        </div>
        <div className="notesSpace">
          {/* {this.state.allNotes.length == 0 ? this.createFirstNote() : <></>} */}
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
              // deleteNote={this.deleteNote}
              // sendNote={this.props.sendNote}
              // sessionID={this.props.sessionID}
              // instanceID={this.props.instanceID}
              // addNote={this.addNote}
              // onChange={this.handleChange}
              // editContent={this.editContent}
              // isContentEditable={this.state.isContentEditable}
              // fontSize={this.state.fontSize}
            />
          ))}
          <Note type="publicNote" addNote={this.addNote} />
        </div>
        {/* <div className="newNote">
          <TextField
            id="outlined-multiline-flexible"
            label="Private-Note"
            multiline
            maxRows={2}
            sx={{ m: 2, width: "50ch" }}
            value={this.state.note}
            onChange={this.handleChange}
          />
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            sx={{ m: 1 }}
            onClick={this.addNote}
          >
            <AddIcon />
          </Fab>
          <Button 
          variant="contained" 
          endIcon={<SendIcon />} sx={{ m: 1 }} 
          onClick={() => this.state.allNotes.map((i) => 
             this.props.sendNote( i,this.props.sessionID,this.props.instanceID)
          )} 
          >
            Send
          </Button>
        </div> */}
        {/* <h4>Private Note</h4>
        <textarea
          id="comment"
          name="notes"
          rows="7"
          cols="30"
          onChange={this.handleChange}
          value={this.state.note}
        />
        <br></br>
        <button
          onClick={() =>
            this.props.sendNote(
              this.state.note,
              this.props.sessionID,
              this.props.instanceID
            )
          }
        >
          Send
        </button>
        <button onClick={this.deleteText}>Clear</button> */}
      </div>
    );
  }
}

export default PrivateNote;
