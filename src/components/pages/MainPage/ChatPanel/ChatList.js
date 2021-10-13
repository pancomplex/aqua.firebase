import React from "react";

import Chat from "./Chat";

import { List } from "../../../style/mainStyle";

function ChatList(props) {
  const renderChats = () => {
    let chatArray = [];
    props.chatData.map((chat, index) => {
      chatArray.push(<Chat key={index} chat={chat} />);
    });
    return chatArray.sort((a, b) => {
      return a.props.chat.lastUpdate.timestamp < b.props.chat.lastUpdate.timestamp ? 1 : -1;
    });
  };

  return (
    <List.Container>
      {props.chatData[0] ? renderChats() : <List.Empty>채팅 목록이 비어있습니다.</List.Empty>}
    </List.Container>
  );
}

export default ChatList;
