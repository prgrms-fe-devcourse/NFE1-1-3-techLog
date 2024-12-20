import styled, { keyframes } from 'styled-components';

const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(128, 128, 128, 0.5), 0 0 10px rgba(128, 128, 128, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(128, 128, 128, 0.8), 0 0 30px rgba(128, 128, 128, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(128, 128, 128, 0.5), 0 0 10px rgba(128, 128, 128, 0.5);
  }
`;

export const FlipCard = styled.div`
  perspective: 1000px;
  width: 30rem;
  height: 23rem;
`;

export const FlipCardInner = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) =>
    isFlipped
      ? 'rotateY(180deg) perspective(1000px)'
      : 'rotateY(0) perspective(1000px)'};
`;

export const FlipCardFront = styled.div<{ isEven?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: ${({ isEven }) => (isEven ? 'black' : 'white')};
  color: ${({ isEven }) => (isEven ? 'white' : 'black')};
  border: 1px solid black;
  border-radius: 7px;
  padding: 3rem;
`;

export const FlipCardBack = styled(FlipCardFront)`
  transform: rotateY(180deg);
  animation: ${glowAnimation} 2s ease-in-out infinite;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;
  height: 14rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Box = styled.div`
  height: 2rem;
  width: 100%;
  font-size: 1.2rem;
  padding-left: 0.5rem;
`;

export const AnswerButton = styled.button<{ isEven?: boolean }>`
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  color: ${({ isEven }) => (isEven ? 'white' : 'black')};
  cursor: pointer;
  padding: 0;
  font-family: inherit;
`;

export const AnswerText = styled.p`
  font-size: 1.5rem;
  margin: 0;
`;
