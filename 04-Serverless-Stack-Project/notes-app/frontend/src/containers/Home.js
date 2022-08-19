import React from 'react';
import styled from 'styled-components';

const StyledHome = styled.div`
  & .lander {
    padding: 80px 0;
    text-align: center;
  }

  & .lander h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
  }
`;

const Home = () => {
  return (
    <StyledHome>
      <div className='lander'>
        <h1>Scratch</h1>
        <p className='text-muted'>A simple note taking app</p>
      </div>
    </StyledHome>
  );
};

export default Home;
