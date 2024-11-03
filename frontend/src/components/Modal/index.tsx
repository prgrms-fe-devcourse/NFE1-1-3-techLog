import React from 'react';
import * as S from './index.styles';

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  // 모달 외부 클릭 시 닫기
  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === 'modal-wrapper') {
      onClose();
    }
  };

  return (
    <S.ModalWrapper id="modal-wrapper" onClick={handleOutsideClick}>
      <S.ModalContent>
        <S.CloseButton onClick={onClose}>✘</S.CloseButton>
        {children}
      </S.ModalContent>
    </S.ModalWrapper>
  );
}

export default Modal;
