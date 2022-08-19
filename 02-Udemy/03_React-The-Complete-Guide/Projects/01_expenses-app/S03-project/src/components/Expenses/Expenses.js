import React from 'react';
import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import './Expenses.css';

const Expenses = ({expenses}) => (
  <Card className='expenses'>
    {expenses.map(exp => (
      <ExpenseItem
        title={exp.title}
        amount={exp.amount}
        date={exp.date}
        key={exp.id}
      />
    ))}
  </Card>
);

export default Expenses;
