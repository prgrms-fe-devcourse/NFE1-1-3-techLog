import React from 'react';
import styled from 'styled-components';

interface AuthButtonProps {
  title: string;
  width?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = styled.button<{ width?: string }>`
  width: ${({ width }) => width || '100%'};
  padding: 2rem 0;
  background-color: ${({ disabled }) => (disabled ? '#E6E6E6' : '#000000')};
  color: ${({ disabled }) => (disabled ? '#9B9B9B' : '#FFFFFF')};
  font-size: 1.6rem;
  border: none;
  border-radius: 15px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#E6E6E6' : '#333333')};
  }

  &:active {
    background-color: ${({ disabled }) => (disabled ? '#E6E6E6' : '#000000')};
  }

  &:focus {
    outline: none;
  }
`;

function AuthButton({
  title,
  width,
  onClick,
  disabled,
  type = 'button'
}: AuthButtonProps) {
  return (
    <Button width={width} onClick={onClick} disabled={disabled} type={type}>
      {title}
    </Button>
  );
}

export default AuthButton;
