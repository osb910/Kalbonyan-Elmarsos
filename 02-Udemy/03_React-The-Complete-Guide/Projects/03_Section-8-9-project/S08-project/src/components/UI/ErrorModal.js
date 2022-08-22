import React, {useState} from 'react';
import styled from 'styled-components';
import Btn from './Btn';

const ErrModal = styled.div`
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;

  & header {
    background: #4f005f;
    padding: 1rem;
  }

  & header h2 {
    margin: 0;
    color: white;
  }

  .content {
    padding: 1rem;
  }

  .actions {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  & + .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background: rgba(0, 0, 0, 0.75);
  }

  @media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 40rem;
  }
`;

const ErrorModal = ({title, message, hideError}) => {
  return (
    <div>
      <ErrModal>
        <header>
          <h2>{title}</h2>
        </header>
        <div className='content'>
          <p>{message}</p>
        </div>
        <footer className='actions'>
          <Btn clickHandler={hideError}>Okay</Btn>
        </footer>
      </ErrModal>
      <div className='backdrop' onClick={hideError}></div>
    </div>
  );
};

export default ErrorModal;
