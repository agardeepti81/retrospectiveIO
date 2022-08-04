import React, { Component } from "react";

class PublicNote extends Component {
  render() {
    console.log(this.props.members);
    return (
        <div id="publicNotes">
        <h4>Public Note</h4>
        {Object.entries(this.props.instanceInfo.notes).map((i) => (
          <div key = {i[0]}>
            <div>{i[1].name} : {i[1].note}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default PublicNote;
