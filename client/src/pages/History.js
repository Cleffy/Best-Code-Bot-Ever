import React, { useState, useEffect } from 'react';

const History = () => {
  const [chatHistory, setChatHistory] = useState([]);

  
  useEffect(() => {
    
    const fetchChatHistory = async () => {
      try {
        
        const response = await fetch('/api/chat-history');
        const data = await response.json();
        setChatHistory(data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <div className="history">
      <h2>Chat History</h2>
      <ul>
        {chatHistory.map((chat, index) => (
          <li key={index}>{chat.username}: {chat.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
