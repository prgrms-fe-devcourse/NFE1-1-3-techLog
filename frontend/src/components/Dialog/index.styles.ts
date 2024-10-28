import styled from 'styled-components';

export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 배경 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center; /* 수직, 수평 가운데 정렬 */
  z-index: 999; /* 다이얼로그가 최상단에 나타나도록 */
`;

export const DialogWrapper = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  background-color: white;
  border-radius: 25px;
  padding: 2rem;
  text-align: center;
  height: 19.2rem;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const Description = styled.p`
  font-size: 3rem;
  text-align: left;
  margin-bottom: 3rem;
  padding: 2rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  gap: 1rem;
`;

export const CancelButton = styled.button`
  border: 1px solid black;
  background-color: white;
  color: black;
  font-size: 1.6rem;
  width: 12.5rem;
  height: 3.5rem;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const ConfirmButton = styled.button`
  border: 1px solid black;
  background-color: black;
  color: white;
  font-size: 1.6rem;
  width: 12.5rem;
  height: 3.5rem;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;
