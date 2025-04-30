'use client';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

export default function ChatWindow({ user }) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = (text) => {
    if (socket) {
      const message = {
        text,
        user: user.name,
        timestamp: new Date().toISOString(),
      };
      socket.emit('message', message);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatMessages messages={messages} currentUser={user} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}