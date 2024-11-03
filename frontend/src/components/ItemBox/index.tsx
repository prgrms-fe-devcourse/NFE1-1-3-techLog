import React from 'react';
import * as S from './index.styles';
import { QaDataWithOnClick } from '../../interface/qaData';
import useModalStore from '../../store/modalStore';

function ItemBox({
  _id,
  shortAnswer,
  title,
  showAnswer,
  onClick,
  isEven
}: Partial<QaDataWithOnClick>) {
  const openReadModal = useModalStore(state => state.openReadModal);

  return (
    <S.ItemBox onClick={onClick} isEven={isEven}>
      <S.Title>{showAnswer ? shortAnswer : title}</S.Title>
      <S.Box style={{ color: isEven ? 'white' : 'black' }}>
        {showAnswer ? (
          <S.AnswerButton
            type="button"
            onClick={e => {
              e.stopPropagation();
              if (_id) openReadModal(_id);
            }}
            isEven={isEven}
          >
            상세 답변 보러가기 →
          </S.AnswerButton>
        ) : (
          <S.AnswerText>답변 보기 →</S.AnswerText>
        )}
      </S.Box>
    </S.ItemBox>
  );
}

export default ItemBox;
