import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as S from './index.styles';
import Dialog from '../../components/Dialog';
import ModalRead from '../../components/Modal/ModalRead';
import ModalForm from '../../components/Modal/ModalForm';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';
import ItemBox from '../../components/ItemBox';
import { loadAllQA } from '../../api/questionAnswer';
import QUERYKEYS from '../../constants/querykeys';
import { QaData } from '../../interface/qaData';

export default function Main() {
  const {
    isDialogOpen,
    handleConfirm,
    handleCancel,
    Tabs,
    activeIndex,
    setIsDialogOpen,
  } = useDialog();
  const {
    isRegisterModalOpen,
    handleRegisterSubmit,
    closeRegisterModal,
    isReadModalOpen,
    detailData,
    isEditModalOpen,
    closeReadModal,
    handleDelete,
    handleEdit,
    handleEditSubmit,
    closeEditModal,
    openRegisterModal,
  } = useModal();

  const [showAnswerState, setShowAnswerState] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleAnswer = (id: string) => {
    setShowAnswerState(prevState => ({
      ...prevState,
      [id]: !prevState[id], // 클릭된 item의 showAnswer 상태를 반전
    }));
  };
  const { data } = useQuery({
    queryKey: [QUERYKEYS.LOAD_ALL_QA],
    queryFn: loadAllQA,
  });
  console.log('data', data);
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
      {isRegisterModalOpen && (
        <ModalForm
          initialCategory="React"
          onSubmit={handleRegisterSubmit}
          onClose={closeRegisterModal}
        />
      )}
      {isReadModalOpen && (
        <ModalRead
          type="read"
          initialCategory={detailData.category}
          question={detailData.question}
          shortAnswer={detailData.shortAnswer}
          detailedAnswer={detailData.detailedAnswer}
          onClose={closeReadModal}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      {isEditModalOpen && (
        <ModalForm
          onSubmit={handleEditSubmit}
          onClose={closeEditModal}
          initialCategory={detailData.category}
          initialQuestion={detailData.question}
          initialShortAnswer={detailData.shortAnswer}
          initialDetailedAnswer={detailData.detailedAnswer}
        />
      )}
      {/* 여기 아래에 3*3형태로 아이템 박스  */}
      <S.PlusButton
        onClick={() => {
          if (localStorage.getItem('username')) {
            openRegisterModal();
          } else {
            setIsDialogOpen(true);
          }
        }}
      >
        +
      </S.PlusButton>
      <S.MainPage>
        <h1>{Tabs[activeIndex]}</h1>
        <S.ItemBoxGrid>
          {data?.data.map((item: QaData, index: number) => (
            <ItemBox
              key={item._id}
              title={item.title}
              shortAnswer={item.shortAnswer}
              showAnswer={showAnswerState[item._id] || false} // 상태에 따라 표시
              onClick={() => toggleAnswer(item._id)} // 클릭 시 답변 토글
              isEven={index % 2 === 0} // 인덱스를 기준으로 짝수/홀수 결정
            />
          ))}
        </S.ItemBoxGrid>
      </S.MainPage>
    </S.Container>
  );
}
