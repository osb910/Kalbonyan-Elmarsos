/** TODOs
 * edit translator color
 * edit translator size
 * fix lang context
 */

import React, {useContext} from 'react';
import styled, {css} from 'styled-components';
import LanguageContext from './store/language-context';
import Navigation from './Navigation';
import Routes from './Routes';
import data from './store/content/home';
import clickSfx from './assets/sfx/Light-Switch-ON_OFF.mp3';
import './App.css';

const StyledApp = styled.div`
  box-sizing: border-box;
  margin: 0;
  text-align: center;
  transition: all 400ms ease;

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    ${({lang}) =>
      lang !== 'ar' &&
      css`
        font-family: 'PT Serif', serif;
      `}
  }

  &.rtl {
    direction: rtl;
    font-family: 'Uthman Taha';
    font-size: 1.125rem;
  }
`;

const App = () => {
  const {lang} = useContext(LanguageContext);
  const content = data[lang];
  document.title = `${content.appName} - ${content.appDesc}`;
  return (
    <StyledApp className={lang === 'ar' && 'rtl'} lang={lang}>
      <div className='container py-3'>
        <Navigation />
        <Routes />
        <audio id='click-sfx' src={clickSfx} preload='none'></audio>
      </div>
    </StyledApp>
  );
};

export default App;
