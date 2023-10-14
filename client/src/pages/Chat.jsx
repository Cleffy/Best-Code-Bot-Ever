import React, { useEffect } from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { QUERY_CHAT } from "../utils/queries";
import { CREATE_CHAT } from "../utils/mutations";
import { CREATE_RESPONSE } from "../utils/mutations";



const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [responseOpen, setResponseOpen] = useState(false);
  const [sendButton, setSendButton] = useState(false);
  const { loading, error, data } = useQuery(QUERY_CHAT);
  
  useEffect(() => {
    console.log(data);
  }, [data]);

  const [createChat, {newChatData}] = useMutation(CREATE_CHAT);

  useEffect(() => {
    console.log(newChatData);
  }, [newChatData]);
  function createNewChat() {

  }
  
  const [createResponse, {newResponseData}] = useMutation(CREATE_RESPONSE);
 
  useEffect(() => {
    console.log(newResponseData);
  }, [newResponseData]);
  

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
            setSendButton(true);
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
          <h3>Enter Coding Questions Below</h3>
          <input type="text" placeholder="Type your message..." />
        </div>
      ) : (
        <></>
      )}

      {!responseOpen ? (
        <button onClick={() => {
          setResponseOpen(true);
          createResponse();
        }}>Send</button>
        ) : (
          <></>
        )}

        {responseOpen ? (
          <div>
            <input type="text" placeholder="Answer Will Appear Here" />
          </div>
          ) : (
            <></>
          )}
    </>
  );
};

export default Chat;
