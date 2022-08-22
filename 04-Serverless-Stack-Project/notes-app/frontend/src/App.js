/** TODOs
 * fix lang context
 */

import React, {useContext, useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import AppContext from './lib/contextLib';
import {Auth} from 'aws-amplify';
import {useNavigate} from 'react-router-dom';
import {onError} from './lib/errorLib';
import Navigation from './Navigation';
import data from './lib/content/home';
import Pages from './Routes';

import clickSfx from './assets/sfx/Light-Switch-ON_OFF.mp3';
import './App.css';
import LoadingSpinner from './components/UI/LoadingSpinner';

const StyledApp = styled.div`
  box-sizing: border-box;
  margin: auto;
  display: flex;
  flex-direction: column;
  ${({isAuthing}) =>
    isAuthing &&
    css`
      justify-content: center;
      align-items: center;
    `}
  height: 100vh;
  text-align: center;
  transition: all 400ms ease;

  :not(.rtl) h1,
  :not(.rtl) h2,
  :not(.rtl) h3,
  :not(.rtl) h4,
  :not(.rtl) h5,
  :not(.rtl) h6 {
    font-family: 'PT Serif', serif;
  }

  &.rtl {
    direction: rtl;
    font-family: 'Uthman Taha';
    font-size: 1.15rem;
  }

  /* input[type='text'], */
  input[type='email'],
  input[type='email']:focus-within {
    font-family: 'Open Sans', sans-serif;
  }
`;

const App = () => {
  const [isAuthenticating, setIsAuthenticated] = useState(true);
  const {lang, setIsAuth} = useContext(AppContext);

  const nav = useNavigate();

  const onLoad = async () => {
    try {
      const res = await Auth.currentSession();
      console.log(res);
      setIsAuth('LOGIN');
    } catch (err) {
      if (err === 'No current user') {
        nav('/signup');
      } else {
        onError(err);
      }
    }
    setIsAuthenticated();
  };

  useEffect(() => {
    onLoad();
  }, []);

  const content = data[lang];
  document.title = `${content.appName} - ${content.appDesc}`;
  document.documentElement.lang = lang;
  return (
    <StyledApp className={lang === 'ar' && 'rtl'} isAuthing={isAuthenticating}>
      {isAuthenticating && <LoadingSpinner lang={lang} />}
      {!isAuthenticating && (
        <div dir={lang === 'ar' ? 'rtl' : 'auto'} className='container py-3'>
          <Navigation />
          <Pages />
          <audio id='click-sfx' src={clickSfx} preload='none'></audio>
        </div>
      )}
    </StyledApp>
  );
};

export default App;
