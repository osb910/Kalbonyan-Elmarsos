import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: '', isValid: false};
};

const Login = props => {
  // States
  const [formIsValid, setFormIsValid] = useState(false);

  // Reducers
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  // Effects
  useEffect(() => {
    let validationTimer = setTimeout(
      () => setFormIsValid(emailIsValid && passwordIsValid),
      500
    );
    // cleanup
    return () => clearTimeout(validationTimer);
  }, [emailIsValid, passwordIsValid]);

  // Handlers
  const emailChangeHandler = evt => {
    console.log(evt.target.value);
    dispatchEmail({type: 'USER_INPUT', val: evt.target.value});
  };

  const passwordChangeHandler = evt => {
    dispatchPassword({type: 'USER_INPUT', val: evt.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = event => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id='email'
          type='email'
          label='E-mail'
          value={emailState.value}
          changeHandler={emailChangeHandler}
          blurHandler={validateEmailHandler}
          isValid={emailIsValid}
          ref={emailRef}
        />
        <Input
          id='password'
          type='password'
          label='Password'
          value={passwordState.value}
          changeHandler={passwordChangeHandler}
          blurHandler={validatePasswordHandler}
          isValid={passwordIsValid}
          ref={passwordRef}
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
