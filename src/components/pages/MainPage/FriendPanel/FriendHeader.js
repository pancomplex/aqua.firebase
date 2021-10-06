import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getDatabase, get, update, ref, query, orderByChild, equalTo } from "firebase/database";

import { Header } from "../../../style/mainStyle";

function FriendHeader(props) {
  // firebase
  const database = getDatabase();

  // useMemo 추가 필요

  // useState
  const [headerMenu, setHeaderMenu] = useState("");
  const [searchedFriendFromServer, setSearchedFriendFromServer] = useState("");

  // useSelector
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleHeaderMenuChange = (menu) => {
    if (menu == headerMenu) {
      setHeaderMenu("");
    } else {
      setHeaderMenu(menu);
    }
  };

  const renderHeaderMenu = (headerMenu) => {
    switch (headerMenu) {
      case "친구 찾기":
        return (
          <Header.Input
            type="text"
            onChange={(e) => {
              handleSearchFriend(e);
            }}
            placeholder="이름으로 친구 검색"
          ></Header.Input>
        );
        break;

      case "친구 추가":
        return (
          <>
            <Header.Input
              type="text"
              onChange={(e) => {
                handleSearchFriendFromServer(e);
              }}
              placeholder="Email로 친구 추가"
            ></Header.Input>
            {searchedFriendFromServer && renderResult()}
          </>
        );
        break;
      default:
    }
  };

  const renderResult = () => {
    //friendlist 구현 후 uid를 redux store와 비교하여 이미 존재하는경우 opacity 0.5
    return (
      <Header.ResultContainer>
        <Header.Result>
          <div>
            <img src={searchedFriendFromServer.image} />
          </div>
          <span>{searchedFriendFromServer.name}</span>
        </Header.Result>
        <Header.Submit
          onClick={(e) => {
            handleAddFriend();
          }}
        ></Header.Submit>
      </Header.ResultContainer>
    );
  };

  const handleSearchFriend = (e) => {
    let input = e.target.value.trim();
    props.renderSearched(input);
  };

  const handleSearchFriendFromServer = (e) => {
    let inputEmail = e.target.value;
    get(query(ref(database, "users/"), orderByChild("email"), equalTo(inputEmail)))
      .then((snapshot) => {
        if (snapshot.val()) {
          let friendInfo = Object.values(snapshot.val())[0];
          setSearchedFriendFromServer({ ...friendInfo, uid: Object.keys(snapshot.val())[0] });
        } else {
          setSearchedFriendFromServer("");
        }
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  const handleAddFriend = () => {
    update(ref(database, "users/" + currentUser.uid + "/friends"), {
      [searchedFriendFromServer.uid]: true,
    });
  };

  return (
    <div>
      <Header.Container>
        <Header.Title>친구</Header.Title>
        <Header.Buttons>
          <Header.SearchBtn
            onClick={() => {
              handleHeaderMenuChange("친구 찾기");
            }}
          />

          <Header.AddFriendBtn
            onClick={() => {
              handleHeaderMenuChange("친구 추가");
            }}
          />
        </Header.Buttons>
      </Header.Container>
      {headerMenu && renderHeaderMenu(headerMenu)}
    </div>
  );
}

export default FriendHeader;
