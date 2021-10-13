import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getDatabase, get, ref, onChildAdded, onChildRemoved, off } from "firebase/database";

import FriendHeader from "./FriendPanel/FriendHeader";
import MyProfile from "./FriendPanel/MyProfile";
import FriendList from "./FriendPanel/FriendList";

import * as Main from "../../style/mainStyle";

function FriendPanel() {
  // useSelector
  const currentUser = useSelector((state) => state.user.currentUser);

  // firebase
  const database = getDatabase();
  const friendListRef = ref(database, "users/" + currentUser.uid + "/friends");

  // useState

  const [friendData, setFriendData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedFriendData, setSearchedFriendData] = useState([]);

  // useEffect
  useEffect(() => {
    addFriendListener();
    return () => {
      off(friendListRef);
    };
    // removeFriendListener();
  }, []);

  const addFriendListener = () => {
    let updatedFriendList = [];
    onChildAdded(friendListRef, (snapshot) => {
      updatedFriendList.push(snapshot.key);
      const friendSet = new Set(updatedFriendList);
      updatedFriendList = [...friendSet];
      makeFriendData(updatedFriendList);
    });
  };

  //  친구 삭제시 업데이트 추후 추가 예정
  // const removeFriendListener = () => {};

  const makeFriendData = async (friendIdArray) => {
    let updatedFriendData = [];
    await Promise.all(
      friendIdArray.map(async (friendId, i) => {
        let snapshot = await get(ref(database, "users/" + friendId));
        updatedFriendData.push(snapshot.val());
        updatedFriendData[i]["uid"] = friendId;
      })
    );
    setFriendData(updatedFriendData);
  };

  const renderSearched = (input) => {
    setIsSearching(true);

    if (input) {
      let friendDataArray = [...friendData];
      setSearchedFriendData(
        friendDataArray.filter((friend) => {
          let regex = new RegExp(input);
          return friend.name.search(regex) != -1;
        })
      );
    } else {
      setIsSearching(false);
    }
  };

  return (
    <Main.Wrapper>
      <FriendHeader renderSearched={renderSearched} />
      {isSearching ? (
        <FriendList friendData={searchedFriendData} />
      ) : (
        <>
          <MyProfile />
          <Main.Partition />
          <FriendList friendData={friendData} />
        </>
      )}
    </Main.Wrapper>
  );
}

export default FriendPanel;
