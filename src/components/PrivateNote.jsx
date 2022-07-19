import React, { Component } from "react";

class PrivateNote extends Component {
    state = {  } 
    render() { 
        return (
            <div id="privateNote">
                <h4>Private Note</h4>
                <textarea id="comment" name="w3review" rows="6" cols="30"></textarea>
                <br></br>
                <button>Send</button>
                <button>Clear</button>
            </div>
        );
    }
}
 
export default PrivateNote;