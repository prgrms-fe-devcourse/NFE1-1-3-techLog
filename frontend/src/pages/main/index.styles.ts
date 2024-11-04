import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  gap: 2rem;
  padding: 6.7rem;
  display: flex;
  position: relative;

  h1 {
    font-size: 4.5rem;
    font-weight: 600;
  }
`;
export const PlusButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 2px solid black;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 5rem;
  font-weight: normal;
  color: black;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

export const MainPage = styled.div`
  width: 100%;
`;

export const ItemBoxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr); // 3열 그리드
  grid-gap: 4rem;
  width: 96rem;
  padding-top: 2rem;
`;
