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

//   DeleteText = (event) => {
//     this.setState({
//         note: "",
//       });
//   }

  render() {
    return (
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
        <button >Clear</button>
      </div>
    );
  }
}

export default PrivateNote;
