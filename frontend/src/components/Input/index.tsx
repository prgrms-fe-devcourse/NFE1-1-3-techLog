import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

interface InputWithLabelProps {
  label: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  width?: string;
}

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 1.4rem;
  font-weight: 700;
`;

const Input = styled.input<{ width?: string }>`
  width: ${({ width }) => width || '100%'};
  padding: 8px 0;
  border: none;
  border-bottom: 1px solid grey;
  font-size: 1.4rem;
  outline: none;

  &:focus {
    border-bottom: 2px solid black;
  }

  &::placeholder {
    color: lightgrey;
  }
`;

function InputWithLabel({
  label,
  placeholder,
  onChange,
  width,
}: InputWithLabelProps) {
  return (
    <div>
      <Label>{label}</Label>
      <Input placeholder={placeholder} onChange={onChange} width={width} />
    </div>
  );
}

export default InputWithLabel;
