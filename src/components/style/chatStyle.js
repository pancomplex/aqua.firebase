import styled from "styled-components";
import * as color from "./color";

import { RiArrowLeftSLine, RiSearchLine, RiSendPlane2Fill } from "react-icons/ri";

export const Header = {
  Wrapper: styled.div`
    width: 100%;
    height: 3rem;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 0.5rem rgba(30, 174, 152, 0.3);
  `,
  GoBackBtn: styled(RiArrowLeftSLine)`
    width: 1.5rem;
    height: 2rem;
    color: ${color.two};
    cursor: pointer;
  `,
  FriendName: styled.h2`
    font-size: 1rem;
    font-weight: 400;
  `,
  SearchBtn: styled(RiSearchLine)`
    width: 1.5rem;
    height: 1.5rem;
    color: ${color.two};
    cursor: pointer;
  `,
  SearchInputWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  SearchInput: styled.input`
    width: 80%;
    height: 2rem;
    border-radius: 2rem;
    border: 2px solid ${color.two};
    padding: 0.625rem 1.25rem;
  `,
};
export const Body = {
  Wrapper: styled.div`
    width: 100%;
    height: calc(100vh - 6rem);
    padding: 1rem 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    background: ${color.three};
  `,
  MessageWrapper: styled.div`
    width: fit-content;
    max-width: 80%;
    display: flex;
    gap: 0.5rem;
    &.mine {
      align-self: end;
      flex-direction: row-reverse;
    }
    &.yours {
      align-self: start;
    }
  `,
  FriendImgBox: styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    overflow: hidden;
  `,
  Message: styled.p`
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
    line-height: 1.5rem;
    font-size: 1rem;
    font-weight: 400;
    word-break: break-all;

    &.mine {
      border-bottom-right-radius: 0;
      background-color: ${color.two};
      color: #fff;
    }
    &.yours {
      border-top-left-radius: 0;
      background-color: #fff;
    }
  `,
  MessageTime: styled.span`
    color: #777;
    font-size: 0.75rem;
    font-weight: 200;
  `,
};
export const Input = {
  Form: styled.form`
    width: 100%;
    height: 3rem;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  `,
  InputText: styled.input`
    width: 100%;
    height: 2rem;
    border-radius: 2rem;
    border: 2px solid ${color.two};
    padding: 0.625rem 1.25rem;
  `,
  Submit: styled(RiSendPlane2Fill)`
    width: 2rem;
    height: 2rem;
    padding 0.325rem;
    border-radius:1rem;
    background-color: ${color.two};
    color: #fff;
    cursor:pointer;
  `,
};
