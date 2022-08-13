import React, { Component } from "react";
import PublicNote from "../PublicNoteWindow/PublicNote";
import PrivateNote from "../PrivateNoteWindow/PrivateNote";
import "./Instance.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

class Instance extends Component {
  state = {};
  render() {
    return (
      <div className="instance">
        <div className="head">
          <div className="emptyDiv"></div>
          <div className="name">{this.props.instanceInfo.name}</div>
          <IconButton
            aria-label="delete"
            size="medium"
            className="deleteInstance"
            onClick={() =>
              this.props.deleteInstance(
                this.props.instanceID,
                this.props.sessionID
              )
            }
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
        <PublicNote
          instanceInfo={this.props.instanceInfo}
          members={this.props.members}
        />
        <PrivateNote
          instanceInfo={this.props.instanceInfo}
          members={this.props.members}
          sessionID={this.props.sessionID}
          instanceID={this.props.instanceID}
          sendNote={this.props.sendNote}
        />
      </div>
    );
  }
}

export default Instance;
