import React, {useState, useContext, useEffect} from 'react';
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

const Login = () => {
  const {lang, isAuth, setIsAuth} = useContext(AppContext);
  const content = data[lang];
  const [isLoading, setIsLoading] = useState(false);

  const [fields, changeFields] = useFormFields({
    email: '',
    password: '',
  });

  const nav = useNavigate();
  const {state} = useLocation();

  useEffect(() => {
    changeFields({
      target: {
        id: 'email',
        value: state?.email,
      },
    });
  }, [state]);

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
      // onError(err);
      if (err.name === 'UserNotConfirmedException') {
        await Auth.resendSignUp(fields.email);
        nav('/signup', {state: {email: fields.email}});
      }
      setIsAuth('LOGOUT');
      setIsLoading(false);
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
        {/* <Form.Group>{isLoading && <LoadingSpinner lang={lang} />}</Form.Group> */}
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
