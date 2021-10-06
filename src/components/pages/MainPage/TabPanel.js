import React from "react";
import { getAuth, signOut } from "firebase/auth";

import * as Tab from "../../style/tabStyle";

function TabPanel(props) {
  const auth = getAuth();
  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <Tab.Wrapper>
      <Tab.Menu>
        <li>
          <Tab.FriendIcon
            onClick={() => {
              props.handleTab("friend");
            }}
            on={props.tab === "friend" ? "true" : "false"}
          />
        </li>
        <li>
          <Tab.ChatIcon
            onClick={() => {
              props.handleTab("chat");
            }}
            on={props.tab === "chat" ? "true" : "false"}
          />
        </li>
        <li>
          <Tab.MoreIcon
            onClick={() => {
              props.handleTab("more");
            }}
            on={props.tab === "more" ? "true" : "false"}
          />
        </li>
        <li>
          <Tab.SignOutIcon onClick={handleLogout} />
        </li>
      </Tab.Menu>
    </Tab.Wrapper>
  );
}

export default TabPanel;
