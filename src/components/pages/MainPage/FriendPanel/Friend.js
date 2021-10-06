import React, { useState } from "react";

import FriendDetail from "./FriendDetail";

import { Item } from "../../../style/mainStyle";

function Friend(props) {
  console.log("friend props", props.friend);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <Item.Container
      onClick={() => {
        setShowProfile((prev) => !prev);
      }}
    >
      <Item.ImageBox>
        <img src={props.friend.image} />
      </Item.ImageBox>
      <Item.TextBox>
        <Item.Title> {props.friend.name}</Item.Title>
        {props.friend.statusMsg && <Item.Content>{props.friend.statusMsg}</Item.Content>}
      </Item.TextBox>
      {showProfile && <FriendDetail info={props.friend} />}
    </Item.Container>
  );
}

export default Friend;
