import React, { useRef, useEffect } from "react";

import Message from "./Message";

import { Body } from "../../style/chatStyle";

function ChatBody(props) {
  console.log("in ChatBody", props.messages);

  const bodyEnd = useRef();
  useEffect(() => {
    bodyEnd.current.scrollIntoView();
  }, [props]);

  const renderMessages = (messages) => {
    if (messages.length > 0) {
      return messages.map((message) => <Message key={message.timestamp} message={message} />);
    }
  };

  return (
    <Body.Wrapper>
      {renderMessages(props.messages)}
      <div ref={bodyEnd} />
    </Body.Wrapper>
  );
}

export default ChatBody;
