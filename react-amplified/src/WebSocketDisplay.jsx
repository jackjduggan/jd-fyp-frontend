import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const WebSocketDisplay = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io('http://192.168.181.132:5000');
    
    socket.on('connect', () => console.log('Connected to server'));
    socket.on('status_update', (message) => {
      setMessages(prev => [...prev, message]);
    });
    socket.on('disconnect', () => console.log('Disconnected from server'));

    return () => socket.disconnect(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Status Updates</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketDisplay;
