import React, {useState} from 'react';
import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import './Expenses.css';
import ExpensesChart from './ExpensesChart';

const Expenses = ({expenses}) => {
  const [selection, setSelection] = useState('2020');
  const handleSelection = selectedYear => setSelection(selectedYear);
  console.log(selection);
  const filteredExpenses = expenses.filter(
    exp => selection === exp.date.getFullYear().toString()
  );

  let finalExpenses = filteredExpenses.length ? (
    filteredExpenses.map(exp => (
      <ExpenseItem
        title={exp.title}
        amount={exp.amount}
        date={exp.date}
        key={exp.id}
      />
    ))
  ) : (
    <p className='expenses-list__fallback'>No expenses found.</p>
  );

  return (
    <div>
      <ExpensesFilter selected={selection} onChangeFilter={handleSelection} />
      <ExpensesChart expenses={finalExpenses} />
      <Card className='expenses'>{finalExpenses}</Card>
    </div>
  );
};

export default Expenses;
