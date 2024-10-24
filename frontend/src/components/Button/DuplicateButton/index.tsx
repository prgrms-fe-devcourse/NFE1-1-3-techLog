import React from 'react';
import styled from 'styled-components';

interface DuplicateButtonProps {
  title: string;
  width?: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = styled.button<{ width?: string }>`
  width: ${({ width }) => width || '100%'};
  padding: 1rem 0; /* 높이를 줄이기 위해 패딩 값 조정 */
  background-color: ${({ disabled }) => (disabled ? '#000000' : '#000000')};
  color: ${({ disabled }) => (disabled ? '#EEEEEE' : '#FFFFFF')};
  font-size: 1.2rem;
  border: none;
  border-radius: 15px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#000000' : '#333333')};
  }

  &:active {
    background-color: ${({ disabled }) => (disabled ? '#E6E6E6' : '#000000')};
  }

  &:focus {
    outline: none;
  }
`;

function DuplicateButton({ title, width, onClick, disabled }: DuplicateButtonProps) {
  return (
    <Button width={width} onClick={onClick} disabled={disabled}>
      {title}
    </Button>
  );
}

export default DuplicateButton;
