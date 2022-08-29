import React from 'react';
import classes from './TodoItem.module.css';
const TodoItem: React.FC<{
  text: string;
  onRemoveItem: (evt: React.MouseEvent) => void;
}> = ({text, onRemoveItem}) => {
  return (
    <li className={classes.item} onClick={onRemoveItem}>
      {text}
    </li>
  );
};

export default TodoItem;
