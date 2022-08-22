import React, {useRef, useState, useContext} from 'react';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import AppContext from '../lib/contextLib';

import LoaderButton from '../components/LoaderButton';
import {onError} from '../lib/errorLib';
import config from '../config';
import styled from 'styled-components';

const StyledNewNote = styled.section`
  height: 300px;
  font-size: 1.5rem;
`;

const NewNote = () => {
  const {lang} = useContext(AppContext);
  const file = useRef(null);
  const nav = useNavigate();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    return /^\s*$/.test(content);
  };

  const changeFile = evt => {
    file.current = evt.target.files[0];
  };

  const submit = async evt => {
    evt.preventDefault();
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);
  };

  return (
    <StyledNewNote>
      <Form onSubmit={submit}>
        <Form.Group controlId='content'>
          <Form.Control
            dir='auto'
            value={content}
            as='textarea'
            onChange={evt => setContent(evt.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='file'>
          <Form.Label>Attachment</Form.Label>
          <Form.Control onChange={changeFile} type='file' />
        </Form.Group>
        <LoaderButton
          lang={lang}
          block
          type='submit'
          size='lg'
          variant='primary'
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </StyledNewNote>
  );
};

export default NewNote;
