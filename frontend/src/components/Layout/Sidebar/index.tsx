import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './index.styles';
import PATH from '../../../constants/path';
import useStore from '../../../store/idxStore';
import Dialog from '../../Dialog';
import useDialog from '../../../hooks/useDialog';
import { authLogout } from '../../../api/auth';
import DevFlipLogo1 from '../../../assets/DevFlipLogo1.png';
import DevFlipLogo2 from '../../../assets/DevFlipLogo2.png';

export default function Sidebar() {
  const navigate = useNavigate();
  const { activeIndex, setActiveIndex } = useStore();
  const isLoggedIn = Boolean(localStorage.getItem('username'));
  const { isDialogOpen, handleCancel, setIsDialogOpen } = useDialog();
  useEffect(() => {
    setActiveIndex(0);
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (index === 4) {
      if (localStorage.getItem('username')) setActiveIndex(4);
      else navigate(PATH.LOGIN);
    }
  };
  const handleLogout = async () => {
    try {
      await authLogout();
      localStorage.clear();
      setIsDialogOpen(false);
      navigate(PATH.MAIN);
      alert('로그아웃 되었습니다.');
    } catch (err) {
      console.log(err);
      alert('로그아웃을 실패했습니다.');
    }
  };
  return (
    <S.Container>
      {isDialogOpen && (
        <Dialog
          width="55.6rem"
          description="로그아웃하시겠어요?"
          confirmButton={handleLogout}
          confirmTitle="확인"
          cancelButton={handleCancel}
          cancelTitle="취소"
        />
      )}
      <S.LogoContainer>
        <img src={DevFlipLogo1} alt="DevFlip Logo" />
        <img src={DevFlipLogo2} alt="DevFlip Logo" />
      </S.LogoContainer>
      <S.MenuBar>
        <h2>Category</h2>
        <S.ListContainer>
          {['All', 'React', 'CS', 'Network'].map((item, index) => (
            <S.ListItem
              key={item}
              isActive={activeIndex === index}
              onClick={() => handleClick(index)}
            >
              {item}
            </S.ListItem>
          ))}
          {isLoggedIn ? (
            <>
              <S.ListItem
                isActive={activeIndex === 4}
                onClick={() => handleClick(4)}
                isSecondLastItem
              >
                MYPAGE
              </S.ListItem>
              <S.ListItem
                isActive={false}
                onClick={() => {
                  setIsDialogOpen(true);
                }}
                isLastItem
              >
                LOGOUT
              </S.ListItem>
            </>
          ) : (
            <S.ListItem
              isActive={activeIndex === 4}
              onClick={() => handleClick(4)}
              isLastItem
            >
              LOGIN
            </S.ListItem>
          )}
        </S.ListContainer>
      </S.MenuBar>
    </S.Container>
  );
}
