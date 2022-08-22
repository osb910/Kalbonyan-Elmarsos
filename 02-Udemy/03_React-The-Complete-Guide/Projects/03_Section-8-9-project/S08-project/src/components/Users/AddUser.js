import React, {useState} from 'react';
import {nanoid} from 'nanoid';
import Btn from '../UI/Btn';
import AddUserForm from '../UI/Form';

const AddUser = ({onAddUser, onError}) => {
  // States
  const [userInput, setUserInput] = useState({
    username: '',
    age: '',
  });

  // Handlers
  const handleFormChange = evt => {
    const {name, value, type, checked} = evt.target;
    setUserInput(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (
      userInput.username.trim().length === 0 ||
      userInput.age.trim().length === 0
    ) {
      onError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }

    if (+userInput.age < 1) {
      onError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }

    onError({title: '', message: ''});

    const newUser = {
      name: userInput.username,
      age: userInput.age,
      id: nanoid(),
    };
    onAddUser(newUser);
    setUserInput({
      username: '',
      age: '',
    });
  };

  return (
    <AddUserForm>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        id='username'
        name='username'
        value={userInput.username}
        onChange={handleFormChange}
      />
      <label htmlFor='age'>Age (Years)</label>
      <input
        type='number'
        id='age'
        name='age'
        value={userInput.age}
        onChange={handleFormChange}
      />
      <Btn type='submit' clickHandler={handleSubmit}>
        Add User
      </Btn>
    </AddUserForm>
  );
};

export default AddUser;
