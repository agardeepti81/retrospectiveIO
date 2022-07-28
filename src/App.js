import "./App.css";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PublicNote from "./components/PublicNote";
import PrivateNote from "./components/PrivateNote";
import StartPage from "./components/StartPage";

const URL = "ws://localhost:8080";

const App = () => {
  const socket = useRef(null);
  const [isStartPage, setIsStartPage] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [members, setMembers] = useState([]);
  const [notes, setNotes] = useState([]);

  const onSocketOpen = useCallback((username) => {
    setIsConnected(true);
    socket.current?.send(JSON.stringify({
      action: "setName",
      name: username
    }))
  }, []);

  const onConnectApp = (username) => {
    onConnect(username);
  }
 
  const onSocketMessage = useCallback((dataStr) => {
    const data = JSON.parse(dataStr);
    switch(data?.type){
      case "initialData":
        setMembers(data.members);
        setNotes(data.notes);
        setIsStartPage(false);
        break;
      case "newMember":
        let newMembers = members;
        debugger;
        console.log(newMembers);
        newMembers.push(data.memberInfo);
        console.log(newMembers);
        setMembers(newMembers);
        alert(`${data.memberInfo.name} has joined the session`);
        break;
      default:
        console.log(data);
    }
  }, []);

  const onConnect = useCallback((username) => {
    if (socket.current?.readyState !== WebSocket.OPEN) {
      socket.current = new WebSocket(URL);
      socket.current.addEventListener('open',() => onSocketOpen(username));
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
          {/* <PublicNote notes={notes} /> */}
          <PrivateNote onSend = {sendNote} notes={notes}/>
          {members.map(member => <span>{member.name}</span>)}
        </div>
      )}
    </div>
  );
};

export default App;
