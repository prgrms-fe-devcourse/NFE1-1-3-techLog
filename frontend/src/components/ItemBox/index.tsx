import React from 'react';
import * as S from './index.styles';
import { QaDataWithOnClick } from '../../interface/qaData';

function ItemBox({
  shortAnswer,
  title,
  showAnswer,
  onClick,
  isEven,
}: Partial<QaDataWithOnClick>) {
  return (
    <S.ItemBox onClick={onClick} isEven={isEven}>
      <div>{showAnswer ? shortAnswer : title}</div>
    </S.ItemBox>
  );
}

export default ItemBox;
