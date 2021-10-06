import React, { useState } from "react";

import FriendPanel from "./MainPage/FriendPanel";
import ChatPanel from "./MainPage/ChatPanel";
import MorePanel from "./MainPage/MorePanel";
import TabPanel from "./MainPage/TabPanel";

function MainPage() {
  const [tab, setTab] = useState("friend");

  const handleTab = (thisTab) => {
    setTab(thisTab);
  };

  const renderMainPanel = () => {
    switch (tab) {
      case "friend":
        return <FriendPanel />;
      case "chat":
        return <ChatPanel />;
      case "more":
        return <MorePanel />;
      default:
        alert("something wrong..");
    }
  };

  return (
    <>
      {renderMainPanel()}
      <TabPanel tab={tab} handleTab={handleTab} />
    </>
  );
}

export default MainPage;
