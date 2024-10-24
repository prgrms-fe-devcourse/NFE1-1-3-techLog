import React from 'react';
import * as S from './index.styles';
import useStore from '../../store';

export default function Main() {
  const { activeIndex } = useStore();
  const Tabs = ['All', 'React', 'CS', 'Network'];

  return (
    <S.Container>
      <h1>{Tabs[activeIndex]}</h1>
    </S.Container>
  );
}
