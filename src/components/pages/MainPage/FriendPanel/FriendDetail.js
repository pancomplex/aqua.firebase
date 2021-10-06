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
    <Detail.Container
      onDoubleClick={() => {
        handleOpenChat();
      }}
    >
      {props.info.name}
    </Detail.Container>
  );
}

export default FriendDetail;
