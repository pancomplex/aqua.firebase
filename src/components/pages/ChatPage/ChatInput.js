import React, { useRef } from "react";

import { Input } from "../../style/chatStyle";

function ChatInput(props) {
  const inputRef = useRef();

  const handleSubmit = async () => {
    await props.sendMessage(inputRef.current.value.trim());
    inputRef.current.value = "";
  };

  return (
    <Input.Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Input.InputText type="text" ref={inputRef} />
      <Input.Submit onClick={handleSubmit} />
    </Input.Form>
  );
}

export default ChatInput;
