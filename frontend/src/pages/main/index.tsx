import React, { useState } from 'react';
import * as S from './index.styles';
import useStore from '../../store';
import Dialog from '../../components/Dialog';
import ItemBox from '../../components/ItemBox';

export default function Main() {
  const { activeIndex } = useStore();
  const Tabs = ['All', 'React', 'CS', 'Network'];
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const handleConfirm = () => {
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const initialItems = [
    {
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
