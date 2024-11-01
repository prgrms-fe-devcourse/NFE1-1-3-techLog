import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as S from './index.styles';
import { ModalProps } from '../../interface/modalProps';
import Modal from '.';
import QUERYKEYS from '../../constants/querykeys';
import { loadQA } from '../../api/questionAnswer';
import useModalStore from '../../store/modalStore';

function ModalRead({ onDelete, onEdit }: ModalProps) {
  const { isReadModalOpen, modalId, closeReadModal } = useModalStore();

  if (!isReadModalOpen || !modalId) return null;
  const { data } = useQuery({
    queryKey: [QUERYKEYS.LOAL_QA, modalId],
    queryFn: () => loadQA(modalId),
  });
  return (
    <Modal onClose={closeReadModal}>
      <h2>{data?.data.category}</h2>
      <S.Label>질문</S.Label>
      <S.Input value={data?.data.title} disabled />
      <S.Label>간단 답변</S.Label>
      <S.Input value={data?.data.shortAnswer} disabled />
      <S.Label>상세 답변</S.Label>
      <S.Textarea value={data?.data.detailedAnswer} disabled />
      <S.ButtonGroup>
        <S.DeleteButton onClick={onDelete}>삭제하기</S.DeleteButton>
        <S.EditButton onClick={onEdit}>수정하기</S.EditButton>
      </S.ButtonGroup>
    </Modal>
  );
}

export default ModalRead;
