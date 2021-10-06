import React from "react";
import { useSelector } from "react-redux";

import { Item } from "../../../style/mainStyle";

function MyProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Item.Container>
      <Item.ImageBox size="3.5rem">
        <img src={currentUser.photoURL} />
      </Item.ImageBox>
      <Item.TextBox margin="3.5rem">
        {/* TextBox의 margin은 ImageBox의 size와 일치시켜야함 */}
        <Item.Title>{currentUser.displayName}</Item.Title>
        {currentUser.statusMsg && <Item.Content>{currentUser.statusMsg}</Item.Content>}
      </Item.TextBox>
    </Item.Container>
  );
}

export default MyProfile;
