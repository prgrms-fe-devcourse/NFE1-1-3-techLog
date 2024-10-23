import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Full = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  flex-direction: column;
  background-color: white;
  position: relative;
`;

const Inner = styled.div`
  width: 140.8rem;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
`;

export default function DefaultLayout() {
  return (
    <Full>
      <Header />
      <Inner>
        <Outlet />
      </Inner>
    </Full>
  );
}
