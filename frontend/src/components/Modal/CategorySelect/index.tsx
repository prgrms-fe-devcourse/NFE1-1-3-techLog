import React from 'react';
import * as S from '../index.styles';
import { Category } from '../../../interface/category';

interface CategorySelectProps {
  value: Category | '';
  onChange?: (value: Category) => void;
  disabled?: boolean;
}

function CategorySelect({
  value,
  onChange,
  disabled = false
}: CategorySelectProps) {
  return (
    <S.Select
      value={value}
      onChange={e => {
        const selectedValue = e.target.value as Category;
        if (selectedValue && onChange) {
          onChange(selectedValue);
        }
      }}
      disabled={disabled}
    >
      <option value="" disabled hidden>
        카테고리 선택
      </option>
      <option value="React">React</option>
      <option value="CS">CS</option>
      <option value="Network">Network</option>
    </S.Select>
  );
}

export default CategorySelect;
