import React from "react";

import * as Loader from "../style/loaderStyle";

function LoadingPage() {
  return (
    <Loader.Wrapper>
      <Loader.Loader />
      <Loader.Text>&nbsp;&nbsp;loading ...&nbsp;</Loader.Text>
    </Loader.Wrapper>
  );
}

export default LoadingPage;
