import React, { useState } from 'react';
import * as S from './index.styles';
import Dialog from '../../components/Dialog';
import ModalRead from '../../components/Modal/ModalRead';
import ModalForm from '../../components/Modal/ModalForm';
import useModal from '../../hooks/useModal';
import useDialog from '../../hooks/useDialog';
import ItemBox from '../../components/ItemBox';

export default function Main() {
  const { isDialogOpen, handleConfirm, handleCancel, Tabs, activeIndex } =
    useDialog();
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
  } = useModal();

  const initialItems = [
    {
      // question, answer이 추가로 생성되면 값 추가
      id: 1,
      question: 'What is React?',
      answer: 'A JavaScript library for building UIs',
      showAnswer: false,
    },
  ];

  const [itemList, setItemList] = useState(initialItems);

  const toggleAnswer = (id: number) => {
    setItemList(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, showAnswer: !item.showAnswer } : item,
      ),
    );
  };

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
      <S.MainPage>
        <h1>{Tabs[activeIndex]}</h1>
        <S.ItemBoxGrid>
          {itemList.map(item => (
            <ItemBox
              key={item.id}
              question={item.question}
              answer={item.answer}
              showAnswer={item.showAnswer}
              onClick={() => toggleAnswer(item.id)} // 클릭 시 답변 토글
            />
          ))}
        </S.ItemBoxGrid>
      </S.MainPage>
    </S.Container>
  );
}
