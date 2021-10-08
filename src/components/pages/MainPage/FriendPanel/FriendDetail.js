import React from "react";
import { useHistory } from "react-router";

import { Detail } from "../../../style/mainStyle";

function FriendDetail(props) {
  const history = useHistory();

  const handleOpenChat = () => {
    alert(props.friend.email);
    history.push(`/chat/${props.friend.email}`);
  };
  return (
    <Detail.Container>
      <Detail.ImageBox>
        <img src={props.friend.image}></img>
      </Detail.ImageBox>
      <Detail.TextBox>
        <Detail.Title> {props.friend.name}</Detail.Title>
        {props.friend.statusMsg && <Detail.Content>{props.friend.statusMsg}</Detail.Content>}
      </Detail.TextBox>
      <Detail.BtnBox>
        <Detail.GoBackBtn
          onClick={() => {
            props.hideProfile();
          }}
        />
        <Detail.ChatBtn
          onClick={() => {
            handleOpenChat();
          }}
        />
      </Detail.BtnBox>
    </Detail.Container>
  );
}

export default FriendDetail;
