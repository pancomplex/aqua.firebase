import styled from "styled-components";
import * as color from "./color";

import {
  RiSearchLine,
  RiUserAddLine,
  RiChatNewLine,
  RiAddCircleLine,
  RiPencilFill,
  RiArrowGoBackLine,
  RiCheckFill,
  RiChat1Fill,
} from "react-icons/ri";

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
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
    padding: 2rem 0.5rem 1rem;
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
    width: 90%;
    height: calc(2rem + 4px);
    border-radius: 2rem;
    border: 2px solid ${color.two};
    padding: 0.625rem 1.25rem;
    margin: 0 5% 0.5rem;
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
  Container: styled.div``,
  Title: styled.h1`
    padding: 0.5rem;
    font-size: 0.8rem;
    color: #777;
    text-align: left;
  `,
  Empty: styled.p`
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    background-color: ${color.two};
    color: #fff;
  `,
};
export const Item = {
  Container: styled.div`
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: ${color.two};
      color: #fff;
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
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `,
  Title: styled.h4`
    font-size: 1rem;
  `,
  LastMessage: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Content: styled.p`
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  Time: styled.span`
    color: #777;
    font-size: 0.75rem;
    font-weight: 200;
    min-width: 3.5rem;
    text-align: right;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    cursor: initial;
    background-color: ${color.one};
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
  `,
  ImageBox: styled.div`
    width: 5rem;
    height: 5rem;
    border: 1px solid #fff;
    border-radius: 35%;
    overflow: hidden;
    cursor: pointer;
  `,
  TextBox: styled.div`
    position: relative;
    max-width: 320px;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #fff;
  `,
  Title: styled.h3`
    font-size: 1.25rem;
    font-weight: 400;
  `,
  Content: styled.p`
    width: fit-content;
    min-height: 20px;
    text-align: center;
    font-weight: 200;
    word-break: break-word;
  `,
  ContentInputBox: styled.div`
    min-width: 40px;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  ContentInput: styled.textarea`
    width: ${(props) => props.width + 16}px;
    height: ${(props) => props.height}px;
    min-height: 20px;
    background-color: transparent;
    color: #fff;
    border: none;
    border-bottom: 1px solid #fff;
    text-align: center;
    font-weight: 200;
    overflow: hidden;
    resize: none;
  `,
  ContentInputIcon: styled(RiPencilFill)`
    position: absolute;
    bottom: 0;
    right: -0.5rem;
    cursor: pointer;

    &:hover {
      color: ${color.two};
    }
  `,
  BtnBox: styled.div`
    display: flex;
    gap: 2rem;
  `,
  GoBackBtn: styled(RiArrowGoBackLine)`
  width: 2rem;
  height: 2rem;
  padding 0.25rem;
  border: 1px solid #fff;
  border-radius: 0.25rem;
  
  cursor: pointer;
  color: #fff;
  &:hover {
    color: ${color.two};
    border: 1px solid ${color.two};
  }
  `,
  SubmitBtn: styled(RiCheckFill)`width: 2rem;
  height: 2rem;
  padding 0.25rem;
  border: 1px solid #fff;
  border-radius: 0.25rem;
  
  cursor: pointer;
  color: #fff;
  &:hover {
    color: ${color.two};
    border: 1px solid ${color.two};
  }`,
  ChatBtn: styled(RiChat1Fill)`
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    color: #fff;
    &:hover {
      color: ${color.two};
    }
  `,
};
Detail.ContentInput.defaultProps = { width: 40, height: 20 };
