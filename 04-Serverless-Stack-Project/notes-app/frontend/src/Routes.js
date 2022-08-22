import React from 'react';
import {Route, Routes} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';
import NotFound from './containers/NotFound';

const appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
    transform: scale(0.95);
  }
  10% {
    opacity: 0.2;
  }
  30% {
    transform: scale(0.98);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    transform: scale(1);
  }
`;

const StyledPages = styled.main`
  & > * {
    animation: ${appear} 500ms ease-in;
  }
`;

const Pages = () => {
  return (
    <StyledPages>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/notes/new' element={<NewNote />} />
        <Route path='notes/:id' element={<Notes />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </StyledPages>
  );
};

export default Pages;
