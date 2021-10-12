import React, { useState } from "react";

import FriendDetail from "./FriendDetail";

import { Item } from "../../../style/mainStyle";

function Friend(props) {
  const [showProfile, setShowProfile] = useState(false);

  const hideProfile = () => {
    setShowProfile(false);
  };

  return (
    <>
      <Item.Container
        onClick={() => {
          setShowProfile(true);
        }}
      >
        <Item.ImageBox>
          <img src={props.friend.image} />
        </Item.ImageBox>
        <Item.TextBox>
          <Item.Title> {props.friend.name}</Item.Title>
          {props.friend.statusMessage && <Item.Content>{props.friend.statusMessage}</Item.Content>}
        </Item.TextBox>
      </Item.Container>
      {showProfile && <FriendDetail friend={props.friend} hideProfile={hideProfile} />}
    </>
  );
}

export default Friend;
