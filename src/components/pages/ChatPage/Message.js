import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Body } from "../../style/chatStyle";

function Message(props) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isMine, setIsMine] = useState();

  useEffect(() => {
    if (props.message.user.id == currentUser.uid) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, []);

  const renderTime = () => {
    const now = new Date();
    const messageTime = new Date(props.message.timestamp);
    if (now.getDate() != messageTime.getDate()) {
      return `${messageTime.getMonth() + 1}월 ${messageTime.getDate()}일`;
    } else {
      return `${messageTime.getHours()}:${messageTime.getMinutes()}`;
    }
  };

  return (
    <Body.MessageWrapper className={isMine ? "mine" : "yours"}>
      {isMine || (
        <Body.FriendImgBox>
          <img src={props.message.user.image} />
        </Body.FriendImgBox>
      )}
      <Body.Message className={isMine ? "mine" : "yours"}>{props.message.content}</Body.Message>
      <Body.MessageTime className={isMine ? "mine" : "yours"}>{renderTime()}</Body.MessageTime>
    </Body.MessageWrapper>
  );
}

export default Message;
