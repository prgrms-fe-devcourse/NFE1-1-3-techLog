import React from 'react';
import * as S from './index.styles';
import { ModalProps } from '../../interface/modalProps';
import Modal from '.';

function ModalRead({
  initialCategory,
  question,
  shortAnswer,
  detailedAnswer,
  onClose,
  onDelete,
  onEdit,
}: ModalProps) {
  return (
    <Modal onClose={onClose}>
      <h2>{initialCategory}</h2>
      <S.Label>질문</S.Label>
      <S.Input value={question} disabled />
      <S.Label>간단 답변</S.Label>
      <S.Input value={shortAnswer} disabled />
      <S.Label>상세 답변</S.Label>
      <S.Textarea value={detailedAnswer} disabled />
      <S.ButtonGroup>
        <S.DeleteButton onClick={onDelete}>삭제하기</S.DeleteButton>
        <S.EditButton onClick={onEdit}>수정하기</S.EditButton>
      </S.ButtonGroup>
    </Modal>
  );
}

export default ModalRead;
