import styled from 'styled-components';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Full = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  flex-direction: column;
`;

const Inner = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-x: auto;
  display: flex;
`;

const Container = styled.div`
  flex-grow: 1;
  justify-content: center;
`;
export default function MainLayout() {
  return (
    <Full>
      <Inner>
        <Sidebar />
        <Container>
          <Outlet />
        </Container>
      </Inner>
    </Full>
  );
}
