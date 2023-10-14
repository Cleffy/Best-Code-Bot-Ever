import React from "react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHAT } from "../utils/queries";

const Chat = () => {
  const { loading, error, data } = useQuery(QUERY_CHAT);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  // return <Layout grid>{JSON.stringify(data)}</Layout>;

  return (
    <>
      <div className="chat-box">
        {/* Display chat messages here */}
        <div className="message-list">
          {/* Map over chat messages and render each one */}
        </div>
        {/* Input field for typing messages */}
        <input type="text" placeholder="Type your message..." />
        {/* Button to send messages */}
        <button onClick={async () => {}}>Send</button>
      </div>

      <div className="response-box"></div>
    </>
  );
};

export default Chat;
