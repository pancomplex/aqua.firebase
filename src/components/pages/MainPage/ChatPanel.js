import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getDatabase, ref, onValue, get, off } from "firebase/database";

import ChatHeader from "./ChatPanel/ChatHeader";
import ChatList from "./ChatPanel/ChatList";

import * as Main from "../../style/mainStyle";

function ChatPanel() {
  // useSelector
  const currentUser = useSelector((state) => state.user.currentUser);

  // firebase
  const database = getDatabase();
  const chatListRef = ref(database, "users/" + currentUser?.uid + "/chats");

  // useState
  const [chatData, setChatData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedChatData, setSearchedChatData] = useState([]);

  // useEffect
  useEffect(() => {
    addChatListener();
    return () => {
      off(chatListRef);
    };
  }, []);

  const addChatListener = async () => {
    await onValue(chatListRef, async (snapshot) => {
      if (snapshot.val()) {
        makeChatData(Object.keys(snapshot.val()));
      }
    });
  };

  const makeChatData = async (chatIdArray, i) => {
    let updatedChatData = [];
    await Promise.all(
      chatIdArray.map(async (chatId, i) => {
        let snapshot = await get(ref(database, "chatRooms/" + chatId));
        let chat = snapshot.val();
        let friend = await getFriendInfo(chatId);
        updatedChatData.push({ ...chat, friend });
      })
    );
    setChatData(updatedChatData);
  };

  const getFriendInfo = async (chatId) => {
    const friendId = getFriendIdFromChatId(chatId);
    let snapshot = await get(ref(database, "users/" + friendId));
    const friendInfo = { ...snapshot.val(), uid: friendId };
    return friendInfo;
  };
  const getFriendIdFromChatId = (chatId) => {
    if (currentUser.uid == chatId.substring(0, 28)) {
      return chatId.substring(28);
    } else {
      return chatId.substring(0, 28);
    }
  };

  const renderSearched = (input) => {
    setIsSearching(true);

    if (input) {
      let chatDataArray = [...chatData];

      setSearchedChatData(
        chatDataArray.filter((chat) => {
          let regex = new RegExp(input);
          return chat.friend.name.search(regex) != -1;
        })
      );
    } else {
      setIsSearching(false);
    }
  };
  return (
    <Main.Wrapper>
      <ChatHeader renderSearched={renderSearched} />

      <ChatList chatData={isSearching ? searchedChatData : chatData} />
    </Main.Wrapper>
  );
}

export default ChatPanel;
