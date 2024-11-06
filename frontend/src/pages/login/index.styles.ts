import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;
  gap: 2rem;
  padding: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 5rem;
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
  }
  h2 {
    padding-bottom: 7rem;
  }
  div {
    padding-bottom: 1rem;
    font-size: 1.4rem;
  }
  p {
    width: 50rem;
    color: #575767;
  }
`;

export const UnderlinedText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  padding-left: 1rem;
`;

export const LogoContainer = styled.div`
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 20px;
  margin-top: -40px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 27%;
    height: auto;
    margin-right: -35px;
    &:last-child {
      margin-right: 0;
      margin-top: 12px;
    }
  }
`;
