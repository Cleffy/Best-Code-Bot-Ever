import React, { useEffect } from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_CHAT } from "../utils/queries";
import { CREATE_CHAT } from "../utils/mutations";
import { CREATE_RESPONSE } from "../utils/mutations";
import History from "./History";



const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const [createChat, { newChatError }] = useMutation(CREATE_CHAT, {
    onCompleted: (data) => {
      setChatData(data); // Set `chatData` when the chat is created
      setChatOpen(true); // Set `chatOpen` to `true` after the chat is created
    },
  });
  const [createResponse, {createResponseError}] = useMutation(CREATE_RESPONSE)
  const [chatData, setChatData] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState('')
  

  useEffect(() => {
    if(chatData){
      console.log(chatData)
    }
    
  }, [chatData])
  
  const handleNewChat = async () => {
   
    try{
      const {data} = await createChat()
      setChatData(data)
    }catch(err){
      console.log(err)
    }
  }
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setCurrentQuestion(newValue);
  };
  const handleQuestionSubmit = async () => {
    console.log(chatData.createChat._id)
    const {data} = await createResponse({
      variables: {
        chatId: chatData.createChat._id,
        responseText: currentQuestion
      }
    })
    const updatedChat = {...chatData}
    updatedChat.createChat.responses = [...data.createResponse.responses]
    setChatData(updatedChat)
    console.log('response: ', data)
  }

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
            handleNewChat()
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
          <input type="text" placeholder="Type your message..." onChange={handleInputChange}/>
          {/* Button to send messages */}
          <button onClick={handleQuestionSubmit}>Send</button>
          
          <div>
            {chatData.createChat.responses.map((response, index) => {
              return <p key={index}>{response.responseText}</p>
            })}
          </div>
        </div>
        
      ) : (
        <></>
      )}
      <History/>
    </>
  );
};

export default Chat;