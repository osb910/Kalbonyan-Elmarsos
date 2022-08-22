import React, {useState, useContext} from 'react';
import {Auth} from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import {useNavigate, useLocation} from 'react-router-dom';
import AppContext from '../lib/contextLib';
import {useFormFields} from '../lib/hooksLib';
import {onError} from '../lib/errorLib';
import data from '../lib/content/header';
import {emailRgx, pwdRgx} from '../lib/utils';
import StyledForm from '../components/UI/StyledForm';

import LoaderButton from '../components/UI/LoaderButton';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import {Handler} from 'aws-cdk-lib/aws-lambda';

const Signup = props => {
  const {lang, isAuth, setIsAuth} = useContext(AppContext);
  const content = data[lang];

  const [fields, changeFields] = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
  });

  const nav = useNavigate();
  const {state} = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(state?.email || null);

  const validateForm = () => {
    return (
      emailRgx.test(fields.email) &&
      pwdRgx.test(fields.password) &&
      fields.password === fields.confirmPassword
    );
  };

  const validateConfirmationForm = () => {
    return fields.confirmationCode.length > 0;
  };

  const handleTooMuchVerReq = () => {
    console.log('Attempt limit exceeded, please try after some time.');
  };

  const resendConfirmation = async () => {
    try {
      await Auth.resendSignUp(fields.email);
      setNewUser(fields.email);
    } catch (err) {
      if (err.name === 'LimitExceededException') {
        handleTooMuchVerReq();
      }
    }
  };

  const handleExistingUser = async () => {
    try {
      await Auth.signIn(fields.email, fields.password);
      setIsLoading(false);
      nav('/login', {state: {email: fields.email}});
    } catch (err) {
      if (err.name === 'UserNotConfirmedException') {
        await resendConfirmation();
      }
    }
  };

  const submit = async evt => {
    evt.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });

      setIsLoading(false);
      setNewUser(newUser);
    } catch (err) {
      if (err.name === 'UsernameExistsException') {
        // await handleExistingUser();
      }
      setIsLoading(false);
    }
  };

  const confirmSubmit = async evt => {
    evt.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      setIsAuth('LOGIN');
      nav('/');
    } catch (err) {
      onError(err);
      setIsLoading(false);
    }
  };

  const confirmationForm = (
    <Form onSubmit={confirmSubmit}>
      <Form.Group controlId='confirmationCode' size='lg' className='group'>
        <Form.Label>{content.confCode}</Form.Label>
        <Form.Control
          autoFocus
          type='tel'
          onChange={changeFields}
          value={fields.confirmationCode}
        />
        <Form.Text muted>{content.confCodeText}</Form.Text>
      </Form.Group>
      <LoaderButton
        lang={lang}
        block='true'
        size='lg'
        type='submit'
        variant='success'
        isLoading={isLoading}
        disabled={!validateConfirmationForm()}
      >
        {content.verify}
      </LoaderButton>
    </Form>
  );

  const form = (
    <Form onSubmit={submit}>
      <Form.Group controlId='email' size='lg' className='group'>
        <Form.Label>{content.email}</Form.Label>
        <Form.Control
          autoFocus
          type='email'
          value={fields.email}
          onChange={changeFields}
          dir='auto'
        />
      </Form.Group>
      <Form.Group controlId='password' size='lg' className='group'>
        <Form.Label>{content.pass}</Form.Label>
        <Form.Control
          type='password'
          value={fields.password}
          onChange={changeFields}
          dir='auto'
        />
        <Form.Text className='text-muted'>{content.signupPassText}</Form.Text>
      </Form.Group>
      <Form.Group controlId='confirmPassword' size='lg' className='group'>
        <Form.Label>{content.confirmPass}</Form.Label>
        <Form.Control
          type='password'
          onChange={changeFields}
          value={fields.confirmPassword}
          dir='auto'
        />
      </Form.Group>
      <LoaderButton
        lang={lang}
        block='true'
        size='lg'
        type='submit'
        variant='success'
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        {content.signup}
      </LoaderButton>
    </Form>
  );

  return <StyledForm>{newUser ? confirmationForm : form}</StyledForm>;
};

export default Signup;
