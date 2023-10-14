import React, { useEffect } from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { QUERY_CHAT } from "../utils/queries";
import { CREATE_CHAT } from "../utils/mutations";
import { CREATE_RESPONSE } from "../utils/mutations";



const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const { loading, error, data } = useQuery(QUERY_CHAT);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const [createChat, {newChatData}] = useMutation(CREATE_CHAT);
  function createNewChat() {

  }
  useEffect(() => {
    console.log(newChatData);
  }, [newChatData]);
  // return <Layout grid>{JSON.stringify(data)}</Layout>;

  return (
    <>
      <div className="chat-box">
        {/* Display chat messages here */}
        <div className="message-list">
          {/* Map over chat messages and render each one */}
        </div>
        {/* Input field for typing messages */}
      </div>

      <div className="response-box"></div>
      {!chatOpen ? (
        <button
          onClick={() => {
            setChatOpen(true);
            createChat();
          }}
        >
          {" "}
          Start New Chat{" "}
        </button>
      ) : (
        <></>
      )}

      {chatOpen ? (
        <div>
          <h1>New Chat</h1>
          <input type="text" placeholder="Type your message..." />
          {/* Button to send messages */}
          <button onClick={async () => {}}>Send</button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Chat;
