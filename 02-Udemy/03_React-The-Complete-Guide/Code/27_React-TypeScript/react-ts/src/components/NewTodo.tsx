import {useContext} from 'react';
import {useRef} from 'react';
import classes from './NewTodo.module.css';
import {TodosContext} from '../store/todos-context';

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  const todoInputRef = useRef<HTMLInputElement>(null);

  const submit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const text = todoInputRef.current!.value;
    if (text?.trim().length === 0) return;

    todosCtx.addTodo(text);
  };

  return (
    <form onSubmit={submit} className={classes.form}>
      <label htmlFor='text'>Todo text</label>
      <input type='text' id='text' ref={todoInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
