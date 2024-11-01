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
  isEven,
}: Partial<QaDataWithOnClick>) {
  const openReadModal = useModalStore(state => state.openReadModal);

  return (
    <S.ItemBox onClick={onClick} isEven={isEven}>
      <S.Title>{showAnswer ? shortAnswer : title}</S.Title>
      <S.Box style={{ color: isEven ? 'white' : 'black' }}>
        {showAnswer ? (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              if (_id) openReadModal(_id);
            }}
            style={{ cursor: 'pointer', color: isEven ? 'white' : 'black' }}
          >
            상세 답변 보러가기 →
          </button>
        ) : (
          <p>답변 보기 →</p>
        )}
      </S.Box>
    </S.ItemBox>
  );
}

export default ItemBox;
