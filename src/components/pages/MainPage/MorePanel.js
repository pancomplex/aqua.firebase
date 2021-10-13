import React from "react";
import MoreHeader from "./MorePanel/MoreHeader";

import * as Main from "../../style/mainStyle";

function MorePanel() {
  return (
    <Main.Wrapper>
      <MoreHeader /> * 이 페이지에 들어갈 추가적인 기능은 추후 개발 예정입니다.
    </Main.Wrapper>
  );
}

export default MorePanel;
