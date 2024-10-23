import styled from 'styled-components';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Full = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  flex-direction: column;
  background-color: white;
`;

const Inner = styled.div`
  width: 100%;
  border: 10px solid blue;
  padding-top: 5.5rem;
  background-color: white;
  height: 100vh;
  position: relative;
  overflow-x: auto;
`;

const Container = styled.div`
  width: 123.8rem;
  border: 2px solid red;
  display: flex;
  justify-content: center;
  position: absolute; /* 수정 */
  flex-wrap: nowrap;
  left: 17rem;
`;
export default function MainLayout() {
  return (
    <Full>
      <Inner>
        {/* <SideBar onClickSideBar={handleOutletClick} /> */}
        <Container>
          <Outlet />
        </Container>
      </Inner>
    </Full>
  );
}
