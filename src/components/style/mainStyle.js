import styled from "styled-components";
import * as color from "./color";

import { RiSearchLine, RiUserAddLine, RiChatNewLine, RiAddCircleLine } from "react-icons/ri";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;
export const Partition = styled.div`
  width: 100%;
  height: 1px;
  background: #ececec;
`;
export const Header = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem 0 1rem 0;
  `,
  Title: styled.h2`
    font-size: 1.5rem;
    color: ${color.one};
  `,
  Buttons: styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
  SearchBtn: styled(RiSearchLine)`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    color: ${color.one};
  `,
  AddFriendBtn: styled(RiUserAddLine)`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    color: ${color.one};
  `,
  AddChatBtn: styled(RiChatNewLine)`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    color: ${color.one};
  `,
  Input: styled.input`
    width: 100%;
    height: calc(2rem + 4px);
    border-radius: 2rem;
    border: 2px solid ${color.two};
    padding: 0.625rem 1.25rem;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
  `,
  ResultContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    margin-bottom: 1rem;
  `,
  Result: styled.div`
    display: flex;
    gap: 0.5rem;

    div {
      width: 1rem;
      height: 1rem;
      border-radius: 0.25rem;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span {
      line-height: 1rem;
    }
  `,
  Submit: styled(RiAddCircleLine)`
    width: 1rem;
    height: 1rem;
    color: ${color.two};
    cursor: pointer;
  `,
};
export const List = {
  Container: styled.div`
    padding-top: 0.5rem;
  `,
  Title: styled.h1`
    font-size: 0.8rem;
    color: #777;
    text-align: left;
  `,
};
export const Item = {
  Container: styled.div`
    padding: 0.5rem 0;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: #777;
    }
  `,
  ImageBox: styled.div`
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    border-radius: 35%;
    border: 1px solid #ccc;
    overflow: hidden;
  `,

  TextBox: styled.div`
    width: calc(100% - calc(${(props) => props.margin} + 0.5rem));
  `,
  Title: styled.h4`
    font-size: 1rem;
  `,
  Content: styled.p`
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
};
Item.ImageBox.defaultProps = {
  size: "3rem",
};
Item.TextBox.defaultProps = {
  margin: "3rem",
};
export const Detail = {
  Container: styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #ccc;
  `,
};
