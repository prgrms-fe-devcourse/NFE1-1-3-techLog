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
    closeRegisterModal,
    isReadModalOpen,
    isEditModalOpen,
    closeReadModal,
    handleEdit,
    closeEditModal,
    openRegisterModal,
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

  // 일반 카테고리 필터링
  const filteredData =
    Tabs[activeIndex] === 'All'
      ? data?.data
      : data?.data.filter(
          (item: QaData) => item.category === Tabs[activeIndex]
        );

  // MYPAGE 필터링
  const mypageFilteredData = data?.data.filter(
    (item: QaData) => item.username === username
  );

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
      {isRegisterModalOpen && <ModalForm onClose={closeRegisterModal} />}
      {isReadModalOpen && (
        <ModalRead type="read" onEdit={handleEdit} onClose={closeReadModal} />
      )}
      {isEditModalOpen && <ModalForm onClose={closeEditModal} />}

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
        {activeIndex === 4 ? (
          <S.MypageH1>
            <strong>{username}</strong>님의 질문카드 모음
          </S.MypageH1>
        ) : (
          <h1>{Tabs[activeIndex]}</h1>
        )}

        {activeIndex === 4 && mypageFilteredData.length === 0 ? (
          <S.EmptyMessage>
            아직 질문카드가 없어요. 첫 질문카드를 등록해보세요!
          </S.EmptyMessage>
        ) : (
          <S.ItemBoxGrid>
            {(activeIndex === 4 ? mypageFilteredData : filteredData)?.map(
              (item: QaData, index: number) => (
                <ItemBox
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  shortAnswer={item.shortAnswer}
                  showAnswer={
                    item._id ? showAnswerState[item._id] || false : false
                  }
                  onClick={() => item._id && toggleAnswer(item._id)}
                  isEven={index % 2 === 0}
                />
              )
            )}
          </S.ItemBoxGrid>
        )}
      </S.MainPage>
    </S.Container>
  );
}
