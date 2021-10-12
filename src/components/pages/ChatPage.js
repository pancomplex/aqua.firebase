import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { getDatabase, ref, get, push, update, serverTimestamp, onValue } from "firebase/database";

import ChatHeader from "./ChatPage/ChatHeader";
import ChatBody from "./ChatPage/ChatBody";
import ChatInput from "./ChatPage/ChatInput";

function ChatPage() {
  // firebase
  const database = getDatabase();

  const currentUser = useSelector((state) => state.user.currentUser);
  const { friendUid } = useParams();
  const [currentFriend, setCurrentFriend] = useState();
  const [messages, setMessages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    const friend = await get(ref(database, "users/" + friendUid)).then((dataSnapshot) => {
      setCurrentFriend(dataSnapshot.val());
    });
  }, []);

  const makeChatRoomId = (myUid, friendUid) => {
    if (myUid > friendUid) {
      return myUid + friendUid;
    } else {
      return friendUid + myUid;
    }
  };
  const chatRoomId = makeChatRoomId(currentUser.uid, friendUid);

  useEffect(() => {
    addMessageListener();
  }, [console.log(messages)]);

  const addMessageListener = () => {
    onValue(ref(database, "chatRooms/" + chatRoomId + "/messages"), (snapshot) => {
      setMessages(Object.values(snapshot.val()));
    });
  };

  // ChatHeader에서 사용
  const handleSearchMessages = (word) => {
    if (word) {
      setIsSearching(true);
      const chatRoomMessages = [...messages];
      const regex = new RegExp(word, "gi");
      const searchResults = chatRoomMessages.reduce((acc, message) => {
        if ((message.content && message.content.match(regex)) || message.user.name.match(regex)) {
          acc.push(message);
        }
        return acc;
      }, []);
      setSearchResults(searchResults);
    } else {
      setIsSearching(false);
    }
  };

  // ChatInput에서 사용
  const sendMessage = async (text) => {
    if (text) {
      const message = {
        timestamp: serverTimestamp(database),
        user: {
          id: currentUser.uid,
          name: currentUser.displayName,
          image: currentUser.photoURL,
        },
        content: text,
      };
      setIsLoading(true);
      await push(ref(database, "chatRooms/" + chatRoomId + "/messages"), message);
      await update(ref(database, "chatRooms/" + chatRoomId), { lastUpdate: message.timestamp });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ChatHeader currentFriend={currentFriend} handleSearchMessage={handleSearchMessages} />
      <ChatBody messages={isSearching ? searchResults : messages} />
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

export default ChatPage;
