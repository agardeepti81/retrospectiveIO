import React, { Component } from "react";
import "./Note.css";

class Note extends Component {
  state = {};
  render() {
    return (
        <div className="note" contentEditable="true">
            <button onClick={() => this.props.deleteNote(this.props.note)}>x</button>
            {this.props.note}
        </div>
    );
  }
}

export default Note;
