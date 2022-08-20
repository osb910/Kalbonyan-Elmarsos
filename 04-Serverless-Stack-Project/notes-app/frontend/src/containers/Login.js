import React, {useState, useContext} from 'react';
import {Auth} from 'aws-amplify';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import LoaderButton from '../components/UI/LoaderButton';
import AppContext from '../lib/contextLib';
import {useFormFields} from '../lib/hooksLib';
import {onError} from '../lib/errorLib';
import data from '../lib/content/header';
import LoadingSpinner from '../components/UI/LoadingSpinner';
// import {Navigate} from 'react-router-dom';

const emailRgx = /^[-.\w%+]+@[-\w]+\.[A-Za-z]{2,6}(\.[A-Z-a-z]{2})?$/;
const pwdRgx =
  /(?=^.{8,32}$)((?=.*[\p{L}\d_])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-|!@"$%&(){}[\]?^'+*/\\]))^.*$/;

const StyledForm = styled.section`
  .rtl & label {
    font-size: 1.25rem;
    font-family: Lotus;
  }

  & .group {
    margin-bottom: 0.8em;
  }
  @media all and (min-width: 480px) {
    padding: 60px 0;

    & form {
      margin: 0 auto;
      max-width: 320px;
    }
  }
`;

const Login = () => {
  const nav = useNavigate();
  const {lang, isAuth, setIsAuth} = useContext(AppContext);
  const content = data[lang];
  const [isLoading, setIsLoading] = useState(false);

  const [fields, changeFields] = useFormFields({
    email: '',
    password: '',
  });

  const validateForm = () => {
    return emailRgx.test(fields.email) && pwdRgx.test(fields.password);
  };

  const submit = async evt => {
    evt.preventDefault();
    if (isAuth) return;
    setIsLoading(true);

    try {
      const signInProcess = await Auth.signIn(fields.email, fields.password);
      console.log(signInProcess);
      setIsLoading(false);
      setIsAuth('LOGIN');
      nav('/');
    } catch (err) {
      onError(err);
      setIsLoading(false);
      setIsAuth('LOGOUT');
    }
  };

  return (
    <StyledForm>
      <Form onSubmit={submit}>
        <Form.Group size='lg' controlId='email' className='group'>
          <Form.Label>{content.email}</Form.Label>
          <Form.Control
            autoFocus
            type='email'
            value={fields.email}
            onChange={changeFields}
            dir='auto'
          />
          {/* <Form.Text className='text-muted'>{content.loginEmailText}</Form.Text> */}
        </Form.Group>
        <Form.Group size='lg' controlId='password' className='group'>
          <Form.Label>{content.pass}</Form.Label>
          <Form.Control
            type='password'
            value={fields.password}
            onChange={changeFields}
            dir='auto'
          />
          <Form.Text className='text-muted'>{content.loginPassText}</Form.Text>
        </Form.Group>
        <Form.Group>{isLoading && <LoadingSpinner lang={lang} />}</Form.Group>
        <LoaderButton
          lang={lang}
          block='true'
          size='lg'
          type='submit'
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          {content.login}
        </LoaderButton>
      </Form>
    </StyledForm>
  );
};

export default Login;
