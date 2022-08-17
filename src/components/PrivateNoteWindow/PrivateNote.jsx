import React, { Component } from "react";
import "./PrivateNote.css";
import Note from "../Note/Note";
import Button from "@mui/material/Button";

class PrivateNote extends Component {
  state = {
    newNote: "", //In Internal Note
    allNotes: [],
    isContentEditable: "false", //In internal note
    fontSize: null, // In internal note
  };

  handleChange = (event) => {
    this.setState({
      note: event.currentTarget.textContent,
    });
    if (this.state.note.length == 140)
      this.setState({
        isContentEditable: "false",
      });
    if (this.state.note.length < 50)
      this.setState({
        fontSize: "medium",
      });
    else if (this.state.note.length > 50 && this.state.note.length < 100)
      this.setState({
        fontSize: "small",
      });
    else if (this.state.note.length > 100)
      this.setState({
        fontSize: "x-small",
      });
  };

  deleteText = (event) => {
    this.setState({
      note: "",
    });
  };

  addNote = (note) => {
    let notes = this.state.allNotes;
    notes.push(note);
    this.setState({
      allNotes: notes
    });
  };

  deleteNote = (delnote) => {
    let updatedNotes = this.state.allNotes;
    let deleteNoteIndex = this.state.allNotes.findIndex(
      (note) => note == delnote
    );
    if (deleteNoteIndex !== -1) {
      updatedNotes.splice(deleteNoteIndex, 1);
    }
    this.setState({
      allNotes: updatedNotes,
    });
  };

  createFirstNote = () => {
    let firstNote = "Enter text here";
    let notes = this.state.allNotes;
    notes.push(firstNote);
    this.setState({
      allNotes: notes,
    });
  };

  editContent = () => {
    this.setState({
      isContentEditable: "true",
    });
  };

  render() {
    return (
      <div class="privateNote">
        <div className="publishAll">
          <Button
            variant="text"
            onClick={() =>
              this.state.allNotes.map((i) =>
                this.props.sendNote(
                  i,
                  this.props.sessionID,
                  this.props.instanceID
                )
              )
            }
          >
            Publish All
          </Button>
        </div>
        <div className="notesSpace">
          {/* {this.state.allNotes.length == 0 ? this.createFirstNote() : <></>} */}
          {this.state.allNotes.map((note) => (
            <Note
              note={note}
              deleteNote={this.deleteNote}
              sendNote={this.props.sendNote}
              sessionID={this.props.sessionID}
              instanceID={this.props.instanceID}
              addNote={this.addNote}
              onChange={this.handleChange}
              editContent={this.editContent}
              isContentEditable={this.state.isContentEditable}
              fontSize={this.state.fontSize}
            />
          ))}
          <Note type="newNote" addNote={this.addNote} />
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
