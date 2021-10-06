import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { getDatabase, get, ref, onChildAdded, onChildRemoved } from "firebase/database";

import FriendHeader from "./FriendPanel/FriendHeader";
import MyProfile from "./FriendPanel/MyProfile";
import FriendList from "./FriendPanel/FriendList";

import * as Main from "../../style/mainStyle";

import testFriendImage1 from "../../../assets/images/UTH.png"; // 임시
import testFriendImage2 from "../../../assets/images/KJG.png"; // 임시
import testFriendImage3 from "../../../assets/images/CGS.png"; // 임시
import { RiContactsBookLine } from "react-icons/ri";

function FriendPanel() {
  // useSelector
  const currentUser = useSelector((state) => state.user.currentUser);

  // firebase
  const database = getDatabase();
  const friendListRef = ref(database, "users/" + currentUser.uid + "/friends");

  // useState
  const [friendList, setFriendList] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedFriendData, setSearchedFriendData] = useState([]);

  // useEffect
  useEffect(() => {
    addFriendListener();
    // removeFriendListener();
  }, [console.log(friendList)]);

  const addFriendListener = () => {
    let updatedFriendList = [];
    onChildAdded(friendListRef, (snapshot) => {
      updatedFriendList.push(snapshot.key);
      const friendSet = new Set(updatedFriendList);
      updatedFriendList = [...friendSet];
      setFriendList(updatedFriendList);
      makeFriendData(updatedFriendList);
    });
  };

  // 친구 삭제시 업데이트 추후 추가 예정
  // const removeFriendListener = () => {
  //   onChildRemoved(friendListRef, (snapshot) => {

  //   });
  // };

  // Make Friend Data
  const makeFriendData = (friendUidArray) => {
    let updatedFriendData = [];
    friendUidArray.map((friendUid) => {
      get(ref(database, "users/" + friendUid)).then((snapshot) => {
        updatedFriendData.push(snapshot.val());
      });
    });
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
