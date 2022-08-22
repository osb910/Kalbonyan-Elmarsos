import React, {useRef} from 'react';
import {nanoid} from 'nanoid';
import Btn from '../UI/Btn';
import AddUserForm from '../UI/Form';

const AddUser = ({onAddUser, onError}) => {
  // Refs
  const inputRef = {
    name: useRef(),
    age: useRef(),
  };
  // States

  // Handlers

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(inputRef.name.current.value);

    if (
      inputRef.name.current.value.trim().length === 0 ||
      inputRef.age.current.value.trim().length === 0
    ) {
      onError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }

    if (+inputRef.age.current.value < 1) {
      onError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }

    onError({title: '', message: ''});

    const newUser = {
      name: inputRef.name.current.value,
      age: inputRef.age.current.value,
      id: nanoid(),
    };
    onAddUser(newUser);
    Object.values(inputRef).forEach(ref => (ref.current.value = ''));
  };

  return (
    <AddUserForm>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        id='username'
        name='username'
        // value={userInput.username}
        // onChange={handleFormChange}
        ref={inputRef.name}
      />
      <label htmlFor='age'>Age (Years)</label>
      <input
        type='number'
        id='age'
        name='age'
        // value={userInput.age}
        // onChange={handleFormChange}
        ref={inputRef.age}
      />
      <Btn type='submit' clickHandler={handleSubmit}>
        Add User
      </Btn>
    </AddUserForm>
  );
};

export default AddUser;
