import "./App.css";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PublicNote from "./components/PublicNote";
import PrivateNote from "./components/PrivateNote";
import StartPage from "./components/StartPage";

const URL = "wss://y5j2cpbimj.execute-api.us-east-2.amazonaws.com/production"

const App = () => {
  const socket = useRef(null);
  const [isStartPage, setIsStartPage] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [members, setMembers] = useState([]);
  const [notes, setNotes] = useState([]);

  const onSocketOpen = useCallback((username) => {
    setIsConnected(true);
    setIsStartPage(false);
    socket.current?.send(JSON.stringify({ action: '$default', useFunction : 'setName', name: username}));
  }, []);

  const onConnectApp = (username) => {
    onConnect(username);
  }
 
  const onSocketMessage = useCallback((dataStr) => {
    const data = JSON.parse(dataStr);
    if(data.members){
      setMembers(data.members);
    }
    else if(data.notes){
      setNotes(data.notes);
    }
    else if(data.newMember){
      let newMembers = members;
      newMembers.push(data.newMember)
      setMembers(newMembers);
    }
    else if(data.newNote)
    {
      let newNotes = notes;
      newNotes.push(data.newNote);
      setNotes(newNotes);
    }
    else if(data.deleteMember)
    {
      let updateMembers = members;
      let deleteMemberIndex = updateMembers.indexOf(data.deleteMember);
      if (deleteMemberIndex !== -1) {
          updateMembers.splice(deleteMemberIndex, 1);
      }
      setMembers(updateMembers);
    }
    else if(data.alertMessage)
    {
      alert(data.alertMessage);
    }
  }, []);

  const onConnect = useCallback((username) => {
    if (socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(URL);
      socket.current.addEventListener('open', () => onSocketOpen(username));
      socket.current.addEventListener('message', (event) => {
        onSocketMessage(event.data);
      });
    }
  }, []);

  const sendNote = (newNote) => 
  {
    socket.current?.send(JSON.stringify({ action: '$default', useFunction : 'addPublicNote', note: newNote}));
  }

  useEffect(() => {
    return () => {
      socket.current?.close();
    };
  }, []);

  console.log(members);
  console.log(notes);
  return (
    <div className="App">
      {isStartPage ? (
        <StartPage 
        onConnect = {onConnectApp}/>
      ) : (
        <div>
          <PublicNote notes={notes} />
          <PrivateNote onSend = {sendNote}/>
          {members.map(i => <span>{i}</span>)}
        </div>
      )}
    </div>
  );
};

export default App;
