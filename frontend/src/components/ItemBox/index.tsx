import React from 'react';
import * as S from './index.styles';

interface ItemBoxProps {
  question: string;
  answer: string;
  showAnswer: boolean;
  onClick: () => void;
}

// 일반 함수 선언으로 컴포넌트를 정의
const ItemBox: React.FC<ItemBoxProps> = function ({
  question,
  answer,
  showAnswer,
  onClick,
}) {
  return (
    <S.ItemBox onClick={onClick}>
      <div>{showAnswer ? answer : question}</div>
    </S.ItemBox>
  );
};

export default ItemBox;
