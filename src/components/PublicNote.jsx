import React, { Component } from "react";

class PublicNote extends Component {
  render() {
    return (
        <div id="publicNotes">
        <h4>Public Note</h4>
        {this.props.notes.map((note,i) => (
          <div key = {i}>
            <div>{note.uid} : {note.note}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default PublicNote;
