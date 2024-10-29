import React from 'react';
import * as S from '../index.styles';
import { Category } from '../../../interface/category';

interface CategorySelectProps {
  value: Category;
  onChange?: (value: Category) => void;
  disabled?: boolean;
}

function CategorySelect({
  value,
  onChange,
  disabled = false,
}: CategorySelectProps) {
  return (
    <S.Select
      value={value}
      onChange={e => onChange && onChange(e.target.value as Category)}
      disabled={disabled}
    >
      <option value="React">React</option>
      <option value="CS">CS</option>
      <option value="Network">Network</option>
    </S.Select>
  );
}

export default CategorySelect;
