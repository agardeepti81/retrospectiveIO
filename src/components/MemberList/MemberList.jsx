import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { Component } from "react";

class MemberList extends Component {
  state = {};
  render() {
    return (
      <div>
        hello
        {/* <Dialog
          open={true}
        //   onClose={handleClose}
        >
          <DialogTitle id="alert-dialog-title">
            {"Member List"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              hello
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions>
            <Button onClick={this.handleClose}>Close</Button>
          </DialogActions> */}
        {/* </Dialog> */}
      </div>
    );
  }
}


export default MemberList;
