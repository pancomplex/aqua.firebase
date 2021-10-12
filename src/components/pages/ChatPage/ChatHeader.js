import React, { useState } from "react";
import { useHistory } from "react-router";

import { Header } from "../../style/chatStyle";

function ChatHeader(props) {
  const history = useHistory();

  const [searchHeader, setSearchHeader] = useState(false);

  const handleClickGoBackBtn = () => {
    history.goBack();
  };
  const handleClickSearchBtn = () => {
    setSearchHeader((prev) => {
      return !prev;
    });
  };

  return (
    <Header.Wrapper>
      <Header.GoBackBtn onClick={handleClickGoBackBtn} />
      {searchHeader ? (
        <Header.SearchInput
          onChange={(e) => {
            props.handleSearchMessage(e.target.value.trim());
          }}
        />
      ) : (
        <Header.FriendName>{props.currentFriend?.name} 님 과의 대화</Header.FriendName>
      )}

      <Header.SearchBtn onClick={handleClickSearchBtn} />
    </Header.Wrapper>
  );
}

export default ChatHeader;
