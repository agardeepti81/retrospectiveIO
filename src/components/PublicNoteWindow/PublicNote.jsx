import React, { Component } from "react";
import "./PublicNote.css";
import Note from "../Note/Note";

class PublicNote extends Component {
  render() {
    console.log(this.props.members);
    return (
      <div className="publicNote">
        <h4>Public Note</h4>
        <div className="notesSpace">
          {Object.entries(this.props.instanceInfo.notes).map((i) => (
          <Note type="publicNote"
                sender= {i[1].name} 
                note={i[1].note} />
          ))}
        </div>
      </div>
    );
  }
}

export default PublicNote;
