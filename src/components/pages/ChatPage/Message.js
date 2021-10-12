import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import moment from "moment";

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

  moment.updateLocale("kr", {
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    weekdays: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    meridiem: function (hour, minute) {
      if (hour < 12) {
        return "오전";
      } else {
        return "오후";
      }
    },
  });

  return (
    <Body.MessageWrapper className={isMine ? "mine" : "yours"}>
      {isMine || (
        <Body.FriendImgBox>
          <img src={props.message.user.image} />
        </Body.FriendImgBox>
      )}
      <Body.Message className={isMine ? "mine" : "yours"}>{props.message.content}</Body.Message>
      <Body.MessageTime></Body.MessageTime>
    </Body.MessageWrapper>
  );
}

export default Message;
