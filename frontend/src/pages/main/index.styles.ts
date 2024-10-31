import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  gap: 2rem;
  padding: 6.7rem;
  display: flex;

  h1 {
    font-size: 4.5rem;
    font-weight: 600;
  }
`;

export const MainPage = styled.div`
  width: 100%;
`;

export const ItemBoxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr); // 3열 그리드
  grid-gap: 20px;
  width: 100%;
  height: 95%;
`;
