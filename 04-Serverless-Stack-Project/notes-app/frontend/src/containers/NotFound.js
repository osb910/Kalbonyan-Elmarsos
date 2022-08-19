import React, {useContext} from 'react';
import styled from 'styled-components';
import LanguageContext from '../store/language-context';

import data from '../store/content/misc';

const StyledNotFound = styled.div`
  padding-top: 100px;
  text-align: center;

  &::before {
    content: '404';
    /* content: '٤٠٤'; */
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 20%;
    left: 35%;
    height: 60vh;
    transform: rotate(-20deg);
    z-index: -1;
    font-size: 20rem;
    color: #888;
    opacity: 0.6;
  }
`;

const NotFound = () => {
  const {lang} = useContext(LanguageContext);
  const content = data[lang];
  return (
    <StyledNotFound>
      <h3>{content.notFound}</h3>
    </StyledNotFound>
  );
};

export default NotFound;
