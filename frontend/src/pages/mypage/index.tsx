import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as S from '../main/index.styles';
import Dialog from '../../components/Dialog';
import ModalRead from '../../components/Modal/ModalRead';
import ModalForm from '../../components/Modal/ModalForm';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';
import ItemBox from '../../components/ItemBox';
import { loadAllQA } from '../../api/questionAnswer';
import QUERYKEYS from '../../constants/querykeys';
import { QaData } from '../../interface/qaData';

export default function Mypage() {
  const { isDialogOpen, handleConfirm, handleCancel } = useDialog();
  const {
    isReadModalOpen,
    isEditModalOpen,
    closeReadModal,
    handleEdit,
    closeEditModal,
  } = useModal();

  const [showAnswerState, setShowAnswerState] = useState<{
    [key: string]: boolean;
  }>({});
  const username = localStorage.getItem('username');

  const toggleAnswer = (id: string | null) => {
    if (id !== null) {
      setShowAnswerState(prevState => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    }
  };

  const { data } = useQuery({
    queryKey: [QUERYKEYS.LOAD_ALL_QA],
    queryFn: loadAllQA,
  });

  const filteredData = data?.data.filter(
    (item: QaData) => item.username === username
  );

  console.log('mypage', data);

  return (
    <S.Container>
      {isDialogOpen && (
        <Dialog
          width="55.6rem"
          description="로그인 후 이용 가능한 기능이에요."
          confirmButton={handleConfirm}
          confirmTitle="로그인"
          cancelButton={handleCancel}
          cancelTitle="돌아가기"
        />
      )}
      {isReadModalOpen && (
        <ModalRead type="read" onEdit={handleEdit} onClose={closeReadModal} />
      )}
      {isEditModalOpen && <ModalForm onClose={closeEditModal} />}
      <S.MainPage>
        <h1>
          <strong>{username}</strong>님의 질문카드 모음
        </h1>
        <S.ItemBoxGrid>
          {filteredData?.map((item: QaData, index: number) => (
            <ItemBox
              key={item._id}
              _id={item._id}
              title={item.title}
              shortAnswer={item.shortAnswer}
              showAnswer={item._id ? showAnswerState[item._id] || false : false}
              onClick={() => item._id && toggleAnswer(item._id)}
              isEven={index % 2 === 0}
            />
          ))}
        </S.ItemBoxGrid>
      </S.MainPage>
    </S.Container>
  );
}
