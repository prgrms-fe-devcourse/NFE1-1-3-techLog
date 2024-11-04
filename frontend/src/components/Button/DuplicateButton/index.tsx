import React from 'react';
import styled from 'styled-components';

interface DuplicateButtonProps {
  title: string;
  width?: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = styled.button<{ width?: string; disabled?: boolean }>`
  width: ${({ width }) => width || '100%'};
  padding: 1rem 0;
  background-color: ${({ disabled }) =>
    disabled ? '#CCCCCC' : '#000000'}; /* 비활성화 시 회색, 활성화 시 검은색 */
  color: ${({ disabled }) => (disabled ? '#666666' : '#FFFFFF')};
  font-size: 1.2rem;
  border: none;
  border-radius: 15px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#CCCCCC' : '#333333')};
  }

  &:active {
    background-color: ${({ disabled }) => (disabled ? '#CCCCCC' : '#000000')};
  }

  &:focus {
    outline: none;
  }
`;

function DuplicateButton({
  title,
  width,
  onClick,
  disabled,
}: DuplicateButtonProps) {
  return (
    <Button width={width} onClick={onClick} disabled={disabled}>
      {title}
    </Button>
  );
}

export default DuplicateButton;
