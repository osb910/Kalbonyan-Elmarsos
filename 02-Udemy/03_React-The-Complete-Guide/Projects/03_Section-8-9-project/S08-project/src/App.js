import React, {useState} from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import ErrorModal from './components/UI/ErrorModal';

const App = () => {
  // States
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState({title: '', message: ''});

  // Handlers
  const editUsers = user => setUsersData(prev => [...prev, user]);
  const editError = ({title, message}) => setError({title, message});

  return (
    <div>
      <AddUser onAddUser={editUsers} onError={editError} />
      <UsersList users={usersData} />
      {error.title && (
        <ErrorModal
          title={error.title}
          message={error.message}
          hideError={() => editError({title: '', message: ''})}
        />
      )}
    </div>
  );
};

export default App;
