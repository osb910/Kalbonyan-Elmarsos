import React, {useContext} from 'react';
import styled from 'styled-components';
import AppContext from '../store/app-context';
import data from '../store/content/home';

const StyledHome = styled.div`
  & .lander {
    padding: 80px 0;
    text-align: center;
  }

  :not(.rtl) & .lander h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
  }

  .rtl & .lander p {
    font-family: Lotus;
    font-size: 1.2rem;
  }
`;

const Home = () => {
  const {lang} = useContext(AppContext);
  const content = data[lang];
  return (
    <StyledHome>
      <div className='lander'>
        <h1>{content.appName}</h1>
        <p className='text-muted'>{content.appDesc}</p>
      </div>
    </StyledHome>
  );
};

export default Home;
