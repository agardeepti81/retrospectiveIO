import React, { Component } from "react";
import "./PrivateNote.css";
import Note from "../Note/Note";
import Button from "@mui/material/Button";

class PrivateNote extends Component {
  state = {
    note: "",
    allNotes: [],
  };

  handleChange = (event) => {
    this.setState({
      note: event.currentTarget.textContent,
    });
  };

  deleteText = (event) => {
    this.setState({
      note: "",
    });
  };

  addNote = () => {
    let notes = this.state.allNotes;
    notes.push(this.state.note);
    this.setState({
      allNotes: notes,
    });
    console.log(this.state.allNotes);
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
          {this.state.allNotes.length == 0 ? (
            <Note
              note={"Enter text here.."}
              deleteNote={this.deleteNote}
              sendNote={this.props.sendNote}
              sessionID={this.props.sessionID}
              instanceID={this.props.instanceID}
              addNote={this.addNote}
              onChange={this.handleChange}
            />
          ) : (
            <></>
          )}
          {this.state.allNotes.map((i) => (
            <Note
              note={i}
              deleteNote={this.deleteNote}
              sendNote={this.props.sendNote}
              sessionID={this.props.sessionID}
              instanceID={this.props.instanceID}
              addNote={this.addNote}
              onChange={this.handleChange}
            />
          ))}
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
