import React, { useState } from "react";
import { useSelector } from "react-redux";

import MyDetail from "./MyDetail";

import { Item } from "../../../style/mainStyle";

function MyProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const hideProfile = () => {
    setShowProfile(false);
  };

  return (
    <>
      <Item.Container
        onClick={() => {
          setShowProfile(true);
        }}
      >
        <Item.ImageBox size="3.5rem">
          <img src={currentUser.photoURL} />
        </Item.ImageBox>
        <Item.TextBox margin="3.5rem">
          {/* TextBox의 margin은 ImageBox의 size와 일치시켜야함 */}
          <Item.Title>{currentUser.displayName}</Item.Title>
          {currentUser.statusMsg && <Item.Content>{currentUser.statusMsg}</Item.Content>}
        </Item.TextBox>
      </Item.Container>
      {showProfile && <MyDetail currentUser={currentUser} hideProfile={hideProfile} />}
    </>
  );
}

export default MyProfile;
