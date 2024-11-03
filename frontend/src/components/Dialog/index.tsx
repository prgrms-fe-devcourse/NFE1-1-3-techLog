import React from 'react';
import * as S from './index.styles';

interface DialogProps {
  width: string;
  description: string;
  confirmButton?: () => void;
  confirmTitle?: string;
  cancelButton: () => void;
  cancelTitle: string;
}
function Dialog({
  width,
  description,
  confirmButton,
  confirmTitle = '확인',
  cancelButton,
  cancelTitle
}: DialogProps) {
  return (
    <S.DialogOverlay>
      <S.DialogWrapper width={width}>
        <S.Description>{description}</S.Description>
        <S.ButtonGroup>
          <S.CancelButton onClick={cancelButton}>{cancelTitle}</S.CancelButton>
          {confirmButton && (
            <S.ConfirmButton onClick={confirmButton}>
              {confirmTitle}
            </S.ConfirmButton>
          )}
        </S.ButtonGroup>
      </S.DialogWrapper>
    </S.DialogOverlay>
  );
}

export default Dialog;
