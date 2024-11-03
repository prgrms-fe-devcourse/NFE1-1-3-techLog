import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as S from './index.styles';
import { ModalProps } from '../../interface/modalProps';
import Modal from '.';
import QUERYKEYS from '../../constants/querykeys';
import { deleteQA, loadQA } from '../../api/questionAnswer';
import useModalStore from '../../store/modalStore';
import useDialog from '../../hooks/useDialog';
import Dialog from '../Dialog';

function ModalRead({ onEdit }: ModalProps) {
  const { isReadModalOpen, modalId, closeReadModal } = useModalStore();
  const { isDialogOpen, setIsDialogOpen, handleCancel } = useDialog();
  const username = localStorage.getItem('username');

  if (!isReadModalOpen || !modalId) return null;
  const { data } = useQuery({
    queryKey: [QUERYKEYS.LOAD_QA, modalId],
    queryFn: () => loadQA(modalId)
  });
  const queryClient = useQueryClient();

  const useDeleteQA = useMutation({
    mutationFn: (id: string) => deleteQA(id),
    onSuccess: () => {
      console.log('삭제 성공');
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.LOAD_ALL_QA] });
    },
    onError: error => {
      console.log('삭제 실패', error);
    }
  });

  console.log('username', data?.data);

  return (
    <>
      {isDialogOpen && (
        <Dialog
          width="46.4rem"
          description="⚠️ 삭제 하시겠습니까?"
          confirmButton={() => {
            setIsDialogOpen(false);
            useDeleteQA.mutate(modalId);
            closeReadModal();
          }}
          confirmTitle="확인"
          cancelButton={handleCancel}
          cancelTitle="취소"
        />
      )}
      <Modal onClose={closeReadModal}>
        <h2>{data?.data.category}</h2>
        <S.Label>질문</S.Label>
        <S.Input value={data?.data.title} disabled />
        <S.Label>간단 답변</S.Label>
        <S.Input value={data?.data.shortAnswer} disabled />
        <S.Label>상세 답변</S.Label>
        <S.Textarea value={data?.data.detailedAnswer} disabled />
        <S.ButtonGroup>
          {username === data?.data.username && (
            <>
              <S.DeleteButton
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                삭제하기
              </S.DeleteButton>
              <S.EditButton onClick={onEdit}>수정하기</S.EditButton>
            </>
          )}
        </S.ButtonGroup>
      </Modal>
    </>
  );
}

export default ModalRead;
