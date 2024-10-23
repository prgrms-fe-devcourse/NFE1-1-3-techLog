import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 88%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 9rem;
  position: relative;
  z-index: 999;
`;
const Home = styled.div`
  font-weight: 200;
  font-size: 1.75rem;
  position: absolute;
  right: 0;
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();

  return (
    <Container>
      <Home
        onClick={() => {
          navigate('/');
        }}
      >
        Home
      </Home>
    </Container>
  );
}

export default Header;
