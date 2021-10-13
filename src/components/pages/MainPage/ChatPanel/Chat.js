import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import { getDatabase, get, ref } from "firebase/database";

import { Item } from "../../../style/mainStyle";

function Chat(props) {
  const history = useHistory();

  // firebase
  const database = getDatabase();
  const friendInfoRef = ref(database, "users/" + props.chat.friendId);

  const handleOpenChat = () => {
    history.push(`/chat/${props.chat.friend.uid}`);
  };

  const renderTime = () => {
    const now = new Date();
    const messageTime = new Date(props.chat.lastUpdate.timestamp);
    if (now.getDate() != messageTime.getDate()) {
      return `${messageTime.getMonth() + 1}월 ${messageTime.getDate()}일`;
    } else {
      return `${messageTime.getHours()}:${messageTime.getMinutes()}`;
    }
  };

  return (
    <Item.Container
      onClick={() => {
        handleOpenChat();
      }}
    >
      <Item.ImageBox>
        <img src={props.chat.friend.image} />
      </Item.ImageBox>
      <Item.TextBox>
        <Item.Title> {props.chat.friend.name}</Item.Title>
        {props.chat.lastUpdate && (
          <Item.LastMessage>
            <Item.Content>{props.chat.lastUpdate.content}</Item.Content>{" "}
            <Item.Time>{renderTime()}</Item.Time>
          </Item.LastMessage>
        )}
      </Item.TextBox>
    </Item.Container>
  );
}

export default Chat;
