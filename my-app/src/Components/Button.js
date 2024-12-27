import React from 'react';
import styled, { css } from 'styled-components';

const root = css`
  background: linear-gradient(
    90deg,
    #0b959c 0%,
    #1fc0b1 50%,
    #6dd5a4 75%,
    #99ff86 100%
  );
`;

const ButtonContainer = styled.button`
  border-radius: 0.7rem;
  padding: 0.5rem 1rem;
  background-color: pink;
  color: #fff;
  border: pink solid 2px;
  &:hover {
    background-color: #7b1184;
    color: #fff;
    border: #7b1184 solid 2px;
  }
  &.白 {
    background-color: rgba(0, 0, 0, 0);
    border: #ff00d7 solid 2px;
    color: #ff00d7;
    &:hover {
      border: #ff00d7 solid 2px;
    }
  }
  &.chat {
    cursor: auto;
    user-select: text;
    text-align: left;
  }
  &.👀 {
    width: clamp(60%, auto, 100%);
    align-self: flex-end;
  }
  &.🤖 {
    width: clamp(60%, 20rem, 100%);
    align-self: flex-start;
  }
  &.🎨 {
    ${root};
    border: none;
  }
`;

const Button = ({ children, ...rest }) => {
  return <ButtonContainer {...rest}>{children}</ButtonContainer>;
};

export default Button;
