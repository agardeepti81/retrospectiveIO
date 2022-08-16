import React, { Component } from "react";
import "./PublicNote.css";

class PublicNote extends Component {
  render() {
    console.log(this.props.members);
    return (
      <div className="publicNote">
        <h4>Public Note</h4>
        <div className="notesSpace">
          {Object.entries(this.props.instanceInfo.notes).map((i) => (
            <div key={i[0]}>
              <div
                style={{
                  width: 152,
                  height: 100,
                  background: "lightpink",
                  color: "red",
                  margin: 2,
                }}
              >
                {i[1].name} : {i[1].note}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PublicNote;
