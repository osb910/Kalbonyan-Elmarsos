import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import {counterActions} from '../store/counter-slice';

const StyledCounter = styled.main`
  margin: 5rem auto;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  width: 40rem;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  background-color: #f4f0fa;

  & h1 {
    text-transform: uppercase;
    color: #575757;
    margin: 0;
    font-size: 1rem;
  }

  .value {
    font-size: 2rem;
    color: #3c0080;
    margin: 2rem 0;
    font-weight: bold;
  }

  & button {
    margin: 0.6em;
  }
`;

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter);
  const counterIsVisible = useSelector(state => state.counter.showCounter);
  console.log(counter);

  const increment = () => {
    console.log('inc');
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  const addFive = () => {
    dispatch(counterActions.increase(5));
  };
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggle());
  };

  return (
    <StyledCounter>
      <h1>Redux Counter</h1>
      {counterIsVisible && <div className='value'>{counter}</div>}
      <div>
        <button onClick={increment}>Increment</button>
        <button onClick={addFive}>Increase by 5</button>
        <button onClick={decrement}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </StyledCounter>
  );
};

export default Counter;
