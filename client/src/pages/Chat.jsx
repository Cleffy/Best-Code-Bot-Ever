import React, { useEffect } from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { CREATE_CHAT } from "../utils/mutations";
import { CREATE_RESPONSE } from "../utils/mutations";
import History from "./History";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { chatIndex } = useParams()
  const [chatOpen, setChatOpen] = useState(false);

  const { data } = useQuery(QUERY_USER);

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

  useEffect(() => {
    if (typeof (chatIndex) === 'string' && userData) {

      // setChatOpen(true)
      try {

        console.log(userData.history[0])
        setChatData({ createChat: userData.history[parseInt(chatIndex)] })
        setChatOpen(true)
      } catch (err) {
        console.log(err)
      }

    } else {
      setChatOpen(false)
    }
  }, [chatIndex, userData])
  const [currentQuestion, setCurrentQuestion] = useState("");

  const handleNewChat = async () => {
    try {
      const { data } = await createChat();
      setChatData(data);
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setCurrentQuestion(newValue);
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
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

  const pressEnter = (e) => {
    if (e.keyCode === 13 && e.shiftKey == false) {
      e.preventDefault();
      handleQuestionSubmit(e);
    }
  }

  return (
    <section className='chatGroup'>
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
        <>
          <form onSubmit={handleQuestionSubmit} onKeyDown={pressEnter}>
            <textarea
              placeholder="Type your message..."
              onChange={handleInputChange}
              style={{
                borderRadius: "22px",
                padding: "1vw",
                fontSize: "calc(6pt + 1vw)",
                minWidth: "40vw",
                maxWidth: "60vw",
                minHeight: "10vw",
                maxHeight: "20vw",
                outline: "none"
              }}
            />
            {/* Button to send messages */}
            <button className="chatSubmit" type="submit">Send</button>
          </form>
          <>
            {loading ? <Spinner /> : (
              <div>
                {chatData.createChat.responses.toReversed().map((response, index) => {
                  console.log(response);
                  return (
                    <div
                      key={index}
                      className={index % 2 === 0 ? "userInput" : "chatBotResponse"}
                    >

                      <p
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "calc(6pt + 1vw)",
                        backgroundColor: "#41aaa9",
                        borderRadius: "22px",
                        padding: "1vw",
                        minWidth: "fit-content"
                      }}
                      > {response.username  === 'Code-Bot' ? "Code-E : " : `${userData.username}: `}</p>
                      <p
                      style={{
                        padding: "4px",
                        textAlign: "left",
                        color:"white"
                      }}
                      >{response.responseText}</p>

                    </div>
                  );
                })}
              </div>
            )}
          </>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Chat;
