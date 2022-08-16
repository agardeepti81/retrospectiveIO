import React, { Component } from "react";
import "./Note.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

class Note extends Component {
  state = {};

  render() {
    return (
      <div className="note">
        <div className="upperIcons">
          <IosShareIcon
            className="sendNoteIcon"
            onClick={() =>
              this.props.sendNote(
                this.props.note,
                this.props.sessionID,
                this.props.instanceID
              )
            }
          />
          <DeleteForeverIcon
            className="deleteNoteIcon"
            onClick={() => this.props.deleteNote(this.props.note)}
          />
        </div>
        <div
          className="text"
          contentEditable={this.props.isContentEditable}
          onInput={(e) => this.props.onChange(e)}
          style={{fontSize: this.props.fontSize}}
        >
          {this.props.note}
        </div>
        <div className="lowerIcons">
          <CheckCircleIcon
            className="saveNoteIcon"
            onClick={() => this.props.addNote()}
          />
          <ModeEditIcon className="editNoteIcon" onClick={this.props.editContent} />
        </div>
        {/* <CancelIcon className="closeIcon" onClick={() => this.props.deleteNote(this.props.note)} /> */}
        {/* <IosShareIcon className="sendNoteIcon"/>
        <DeleteForeverIcon className="deleteNoteIcon"/>
        <ModeEditIcon className="editNoteIcon" />
        <CheckCircleIcon className="saveNoteIcon" />
        <div className="senderName" contentEditable="false">Se</div> */}

        {/* <button id="send"
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
        {this.props.note} */}
      </div>
    );
  }
}

export default Note;
