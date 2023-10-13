// import React  from "react";

function Chat() {

    return (
      <div className="chat-box">
        {/* Display chat messages here */}
        <div className="message-list">
          {/* Map over chat messages and render each one */}
        </div>
        {/* Input field for typing messages */}
        <input type="text" placeholder="Type your message..." />
        {/* Button to send messages */}
        <button>Send</button>
      </div>
    );
  }


export default Chat;