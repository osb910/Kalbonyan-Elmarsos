import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {authActions} from '../store/auth-slice';

const StyledAuth = styled.main`
  margin: 5rem auto;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  width: 25rem;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  background-color: #f4f0fa;

  .control {
    margin-bottom: 0.5rem;
  }

  .control label {
    display: block;
    color: #616161;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .control input {
    display: block;
    width: 20rem;
    margin: auto;
    border-radius: 4px;
    padding: 0.25rem;
    border: 1px solid #ccc;
  }
`;

const Auth = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const login = evt => {
    evt.preventDefault();
    console.log('runs');
    dispatch(authActions.login());
  };
  // const logout = () => {
  //   dispatch(authActions.logout());
  // };

  return (
    <StyledAuth>
      <section>
        <form onSubmit={login}>
          <div className='control'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className='control'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </StyledAuth>
  );
};

export default Auth;
