import React, { Component } from "react";

class PublicNote extends Component {
  state = {};
  render() {
    return (
      <div id="publicNotes" key={this.props.notes}>
        <h4>Public Note</h4>
        {this.props.notes.map((note,i) => (
          <div key = {i}>
            <div>{note.sender} : {note.note}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default PublicNote;
