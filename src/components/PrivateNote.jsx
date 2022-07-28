import React, { Component } from "react";

class PrivateNote extends Component {
  state = {
    note: "",
  };

  handleChange = (event) => {
    this.setState({
      note: event.target.value,
    });
  };

  DeleteText = (event) => {
    this.setState({
        note: "",
      });
  }

  render() {
    return (
      <div>
      <div id="publicNotes">
        <h4>Public Note</h4>
        {this.props.notes.map((note,i) => (
          <div key = {i}>
            <div>{note.uid} : {note.note}</div>
          </div>
        ))}
      </div>

      <div id="privateNote">
        <h4>Private Note</h4>
        <textarea
          id="comment"
          name="notes"
          rows="7"
          cols="30"
          onChange={this.handleChange}
          value={this.state.note}
        />
        <br></br>
        <button onClick={() => this.props.onSend(this.state.note)}>Send</button>
        <button onClick={this.DeleteText} >Clear</button>
      </div>
      </div>
    );
  }
}

export default PrivateNote;
