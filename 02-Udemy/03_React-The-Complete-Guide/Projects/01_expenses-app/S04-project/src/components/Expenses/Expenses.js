import React, {useState} from 'react';
import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import './Expenses.css';

const Expenses = ({expenses}) => {
  const [selection, setSelection] = useState('2020');
  const handleSelection = selectedYear => setSelection(selectedYear);
  console.log(selection);

  return (
    <div>
      <ExpensesFilter selected={selection} onChangeFilter={handleSelection} />
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
    </div>
  );
};

export default Expenses;
