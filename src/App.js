import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js'
import axios from './axios';

import './App.css';


function App() {

  const [ messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('7c1edfef3f9870f4bff3', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages)

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
//ab939c4fcaf14429891ec6135fe11676