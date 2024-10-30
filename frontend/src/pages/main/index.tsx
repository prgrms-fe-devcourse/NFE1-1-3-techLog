import React, { useState } from 'react';
import * as S from './index.styles';
import useStore from '../../store';
import Dialog from '../../components/Dialog';

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
        <S.ItemBox>
          <div>React에서 props란?</div>
          <div>컴포넌트란 무엇인가?</div>
          <div>React에서 props란?</div>
          <div>컴포넌트란 무엇인가?</div>
          <div>React에서 props란?</div>
          <div>컴포넌트란 무엇인가?</div>
          <div>React에서 props란?</div>
          <div>컴포넌트란 무엇인가?</div>
          <div>React에서 props란?</div>
        </S.ItemBox>
        <S.PlusBtn>+</S.PlusBtn>
      </S.MainPage>
    </S.Container>
  );
}
