import styled from "styled-components";
import { Link } from "react-router-dom";

import * as color from "./color";

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
  background: linear-gradient(70deg, ${color.two}, ${color.three});
`;
export const Title = styled.h1`
  font-size: ${(props) => props.size};
  font-family: "Barlow", sans-serif;
  font-weight: 100;
  color: ${color.one};
  text-shadow: 2px 2px 2px ${color.four};
  margin-bottom: 2rem;
`;
Title.defaultProps = { size: "2rem" };
export const Form = styled.form`
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${color.one};
`;
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
export const Input = styled.input`
  padding: 0.5rem;
  color:${color.one};
  background: ${color.three};
  border: 1px solid ${color.two};
  box-shadow: 1px 1px 1px ${color.four};
  &:focus {
    background: ${color.four};
    outline : 1.5px solid ${color.one};
    }
  }
`;
export const Submit = styled.input`
  margin-top: 1rem;
  height: 40px;
  color: ${color.one};
  text-shadow: 1px 1px 1px ${color.four};
  background: ${color.three};

  border: 1px solid ${color.two};
  box-shadow: 1px 1px 1px ${color.four};
  &:hover {
    cursor: pointer;
    text-shadow: 1px 1px 1px ${color.three};
    background: ${color.four};
    outline: 1.5px solid ${color.one};
  }
`;
export const WarningMsg = styled.p`
  font-size: 0.8rem;
  color: crimson;
`;
export const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${color.one};
  &:hover {
    color: #fff;
  }
`;
