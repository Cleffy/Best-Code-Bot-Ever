import React, { useEffect } from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { CREATE_CHAT } from "../utils/mutations";
import { CREATE_RESPONSE } from "../utils/mutations";
import History from "./History";
import Spinner from "../components/Spinner";

const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const {data} = useQuery(QUERY_USER);

  const userData = data?.user || {}
  console.log(userData.username);

  const [createChat, { newChatError }] = useMutation(CREATE_CHAT, {
    onCompleted: (data) => {
      setChatData(data); // Set `chatData` when the chat is created
      setChatOpen(true); // Set `chatOpen` to `true` after the chat is created
    },
  });
  const [createResponse, { error, loading }] =
    useMutation(CREATE_RESPONSE);
  const [chatData, setChatData] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState("");

  // useEffect(() => {
  //   if (chatData) {
  //     console.log(chatData);
  //   }
  // }, [chatData]);

  const handleNewChat = async () => {
    try {
      const { data } = await createChat();
      setChatData(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setCurrentQuestion(newValue);
  };
  const handleQuestionSubmit = async () => {
    console.log(chatData.createChat._id);
    const { data } = await createResponse({
      variables: {
        chatId: chatData.createChat._id,
        responseText: currentQuestion,
      },
    });
    const updatedChat = { ...chatData };
    updatedChat.createChat.responses = [...data.createResponse.responses];
    setChatData(updatedChat);
    setCurrentQuestion('Type your message...');
    console.log("response: ", data);
  };

  return (
    <>
      <div className="response-box"></div>
      {!chatOpen ? (
        <button
          onClick={() => {
            handleNewChat();
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
          <h2>New Chat</h2>
          <textarea
            placeholder="Type your message..."
            onChange={handleInputChange}
            style={{
              borderRadius: "22px",
              padding: "10px",
              fontSize: "16px",
              width: "80%",
              minHeight: "256px",
              maxHeight: "512px"
            }}
          />
          {/* Button to send messages */}
          <button onClick={handleQuestionSubmit}>Send</button>
          {loading ? <Spinner /> : (
            <div>
              {chatData.createChat.responses.map((response, index) => {
                console.log(response);
                return (
                  <div
                    key={index}
                    className={index % 2 === 0 ? "userInput" : "chatBotResponse"}
                  >

                    <p> {response.username  === 'Code-Bot' ? "Code Bot: " : `${userData.username}: `}{response.responseText}</p>
                  </div>
                );
              })}
            </div>

          )}
        </div>
      ) : (
        <></>
      )}
      <History />
    </>
  );
};

export default Chat;
