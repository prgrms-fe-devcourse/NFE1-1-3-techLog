import React, { useState } from 'react';
import * as S from './index.styles';
import { QaDataWithOnClick } from '../../interface/qaData';
import useModalStore from '../../store/modalStore';

function ItemBox({
  _id,
  shortAnswer,
  title,
  isEven,
}: Partial<QaDataWithOnClick>) {
  const [isFlipped, setIsFlipped] = useState(false);
  const openReadModal = useModalStore(state => state.openReadModal);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <S.FlipCard>
      <S.FlipCardInner isFlipped={isFlipped}>
        <S.FlipCardFront isEven={isEven} onClick={handleFlip}>
          <S.Title>{title}</S.Title>
          <S.Box>
            <S.AnswerText>답변 보기 →</S.AnswerText>
          </S.Box>
        </S.FlipCardFront>
        <S.FlipCardBack isEven={isEven} onClick={handleFlip}>
          <S.Title>{shortAnswer}</S.Title>
          <S.Box>
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
          </S.Box>
        </S.FlipCardBack>
      </S.FlipCardInner>
    </S.FlipCard>
  );
}

export default ItemBox;
