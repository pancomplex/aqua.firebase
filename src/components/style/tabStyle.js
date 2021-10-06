import styled from "styled-components";
import * as color from "./color";

import { IoPeopleOutline, IoChatboxOutline } from "react-icons/io5";
import { IoIosMore, IoIosLogOut } from "react-icons/io";

export const Wrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 0.5rem rgba(30, 174, 152, 0.3);
`;
export const Menu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
export const FriendIcon = styled(IoPeopleOutline)`
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: ${(props) => (props.on == "true" ? color.one : color.two)};
  &:hover {
    color: ${color.one};
  }
`;
export const ChatIcon = styled(IoChatboxOutline)`
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: ${(props) => (props.on == "true" ? color.one : color.two)};
  &:hover {
    color: ${color.one};
  }
`;
export const MoreIcon = styled(IoIosMore)`
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: ${(props) => (props.on == "true" ? color.one : color.two)};
  &:hover {
    color: ${color.one};
  }
`;
export const SignOutIcon = styled(IoIosLogOut)`
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: ${color.two};
  &:hover {
    color: ${color.one};
  }
`;
