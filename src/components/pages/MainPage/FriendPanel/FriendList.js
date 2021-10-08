import React from "react";

import Friend from "./Friend";

import { List } from "../../../style/mainStyle";

function FriendList(props) {
  const renderFriends = () => {
    let friendArray = [];
    props.friendData.map((friend, index) => {
      friendArray.push(<Friend key={index} friend={friend} />);
    });
    return friendArray.sort((a, b) => {
      return a.props.friend.name > b.props.friend.name ? 1 : -1;
    });
  };

  return (
    <List.Container>
      <List.Title>친구 ({props.friendData.length})</List.Title>
      {renderFriends()}
    </List.Container>
  );
}

export default FriendList;
