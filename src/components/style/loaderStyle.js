import styled, { keyframes } from "styled-components";
import * as color from "./color";

const rotate = keyframes`
0%{transform:rotate(0deg);}
100%{transform:rotate(360deg);}
`;
const dots = keyframes`
0%{width:2.5rem;}
100%{width:0rem;}
`;

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: ${color.one};
`;
export const Loader = styled.div`
  position: relative;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background: linear-gradient(45deg, transparent, transparent 40%, ${color.two});
  animation: ${rotate} 3s linear infinite;

  &:before {
    content: "";
    position: absolute;
    top: 5%;
    right: 5%;
    bottom: 5%;
    left: 5%;
    border-radius: 50%;
    background: ${color.one};
    z-index: 222;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    background: linear-gradient(45deg, transparent, transparent 40%, ${color.three});
    z-index: 111;
    filter: blur(1rem);
  }
`;

Loader.defaultProps = { size: "8rem" };
export const Text = styled.p`
  position: relative;
  font-size: 2rem;
  font-weight: 200;
  color: ${color.four};
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 2rem;
    background: ${color.one};
    z-index: 111;
    animation: ${dots} 3s linear infinite;
  }
`;
