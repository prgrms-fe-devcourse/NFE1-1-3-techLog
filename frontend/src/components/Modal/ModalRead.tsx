import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { io, Socket } from 'socket.io-client';
import * as S from './index.styles';
import { ModalProps } from '../../interface/modalProps';
import Modal from '.';
import QUERYKEYS from '../../constants/querykeys';
import { deleteQA, loadQA } from '../../api/questionAnswer';
import useModalStore from '../../store/modalStore';
import useDialog from '../../hooks/useDialog';
import Dialog from '../Dialog';
import CommentSection from '../Comment';
import CommentInput from '../Input/CommentInput';

const SOCKET_URL = 'https://nfe1-1-3-techlog.onrender.com';

interface Comment {
  _id?: string;
  userId: string;
  postId: string;
  content: string;
  createdAt?: string;
}

function ModalRead({ onEdit }: ModalProps) {
  const { isReadModalOpen, modalId, closeReadModal } = useModalStore();
  const { isDialogOpen, setIsDialogOpen, handleCancel } = useDialog();
  const username = localStorage.getItem('username');
  const [comments, setComments] = useState<Comment[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  if (!isReadModalOpen || !modalId) return null;

  const { data } = useQuery({
    queryKey: [QUERYKEYS.LOAD_QA, modalId],
    queryFn: () => loadQA(modalId),
  });

  const queryClient = useQueryClient();

  const useDeleteQA = useMutation({
    mutationFn: (id: string) => deleteQA(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERYKEYS.LOAD_ALL_QA] });
      closeReadModal();
    },
  });

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(newSocket);

    // 연결된 후에만 join_room 호출
    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.connected);

      if (modalId) {
        newSocket.emit('join_post', modalId);
        console.log(`Joined room with ID: ${modalId}`);
      }
    });

    // 초기 댓글 로딩
    newSocket.on('load_comments', (initialComments: any[]) => {
      console.log('Received initial comments:', initialComments);
      setComments(initialComments);
    });

    // 새 댓글 실시간 수신
    newSocket.on('comment_added', (newComment: Comment) => {
      console.log('Received new comment:', newComment);
      setComments(prevComments => [...prevComments, newComment]);
    });

    // 연결 오류 처리
    newSocket.on('connect_error', error => {
      console.error('Connection error:', error);
    });

    // 컴포넌트 언마운트 시 소켓 정리
    return () => {
      if (modalId) {
        newSocket.emit('leave_room', modalId);
        console.log(`Leaving room with ID: ${modalId}`);
      }
      newSocket.off('connect');
      newSocket.off('load_comments');
      newSocket.off('comment_added');
      newSocket.off('connect_error');
      newSocket.disconnect();
      console.log('Socket disconnected');
    };
  }, [modalId]);

  const handleCommentSubmit = (content: string) => {
    if (!socket || !modalId || !username) return;

    const newComment = {
      userId: username,
      postId: modalId,
      content,
    };

    socket.emit('new_comment', newComment);
    // UI 업데이트는 comment_added 이벤트에서만 처리
  };

  return (
    <>
      {isDialogOpen && (
        <Dialog
          width="46.4rem"
          description="⚠️ 삭제 하시겠습니까?"
          confirmButton={() => {
            setIsDialogOpen(false);
            useDeleteQA.mutate(modalId);
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
              <S.DeleteButton onClick={() => setIsDialogOpen(true)}>
                삭제하기
              </S.DeleteButton>
              <S.EditButton onClick={onEdit}>수정하기</S.EditButton>
            </>
          )}
        </S.ButtonGroup>
        {/* Comment Section */}
        <CommentSection comments={comments} />
        <CommentInput onSubmit={handleCommentSubmit} />
      </Modal>
    </>
  );
}

export default ModalRead;
