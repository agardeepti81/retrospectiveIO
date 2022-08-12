import React, { Component } from "react";
import "./Note.css";

class Note extends Component {
  state = {};
  render() {
    return (
      <div className="note" contentEditable="true">
        <button id="delete" onClick={() => this.props.deleteNote(this.props.note)}>
          x
        </button>
        <button id="send"
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
        {this.props.note}
      </div>
    );
  }
}

export default Note;
