import React, {useState} from 'react';
import './NewExpense.css';
const NewExpense = ({onSaveExpenseData}) => {
  const [inputs, setInputs] = useState({
    title: '',
    amount: '',
    date: '',
  });

  const titleChangeHandler = evt => {
    setInputs(prev => ({...inputs, title: evt.target.value}));
  };

  const amountChangeHandler = evt => {
    setInputs(prev => ({...inputs, amount: evt.target.value}));
  };

  const dateChangeHandler = evt => {
    setInputs(prev => ({...inputs, date: evt.target.value}));
  };

  const submitHandler = evt => {
    evt.preventDefault();
    inputs.date = new Date(inputs.date);
    onSaveExpenseData(inputs);
    setInputs({
      title: '',
      amount: '',
      date: '',
    });
  };

  return (
    <form className='new-expense' onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input
            type='text'
            value={inputs.title}
            onChange={titleChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={inputs.amount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={inputs.date}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
};

export default NewExpense;
