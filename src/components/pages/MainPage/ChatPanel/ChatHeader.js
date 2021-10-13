import React, { useState } from "react";

import { Header } from "../../../style/mainStyle";

function ChatHeader(props) {
  const [headerMenu, setHeaderMenu] = useState("");

  const handleHeaderMenuChange = (menu) => {
    if (menu == headerMenu) {
      setHeaderMenu("");
    } else {
      setHeaderMenu(menu);
    }
  };

  const renderHeaderMenu = (headerMenu) => {
    switch (headerMenu) {
      case "채팅 찾기":
        return (
          <Header.Input
            type="text"
            onChange={(e) => {
              handleSearchChat(e);
            }}
            placeholder="친구 이름으로 채팅 검색"
          ></Header.Input>
        );

      // case "새 채팅":
      //   return <></>;

      default:
    }
  };

  const handleSearchChat = (e) => {
    let input = e.target.value.trim();
    props.renderSearched(input);
  };

  return (
    <>
      <Header.Container>
        <Header.Title>채팅</Header.Title>
        <Header.Buttons>
          <Header.SearchBtn
            onClick={() => {
              handleHeaderMenuChange("채팅 찾기");
            }}
          />

          {/* <Header.AddChatBtn
            onClick={() => {
              handleHeaderMenuChange("새 채팅");
            }}
          /> */}
        </Header.Buttons>
      </Header.Container>
      {headerMenu && renderHeaderMenu(headerMenu)}
    </>
  );
}

export default ChatHeader;
