import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './index.styles';
import PATH from '../../../constants/path';
import useStore from '../../../store/idxStore';

export default function Sidebar() {
  const navigate = useNavigate();
  const { activeIndex, setActiveIndex } = useStore();

  const handleClick = (index: number) => {
    setActiveIndex(index);
    if (index === 4) {
      if (localStorage.getItem('username')) navigate(PATH.MYPAGE);
      else navigate(PATH.LOGIN);
    }
  };
  return (
    <S.Container>
      <h1>Tech log</h1>
      <S.MenuBar>
        <h2>Category</h2>
        <S.ListContainer>
          {['All', 'React', 'CS', 'Network'].map((item, index) => (
            <S.ListItem
              isActive={activeIndex === index}
              onClick={() => handleClick(index)}
            >
              {item}
            </S.ListItem>
          ))}
          <S.ListItem
            isActive={activeIndex === 4}
            onClick={() => handleClick(4)}
          >
            {localStorage.getItem('username') ? 'MYPAGE' : 'LOGIN'}
          </S.ListItem>
        </S.ListContainer>
      </S.MenuBar>
    </S.Container>
  );
}
