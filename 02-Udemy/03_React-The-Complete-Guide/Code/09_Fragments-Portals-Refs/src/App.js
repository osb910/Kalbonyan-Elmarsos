import React, {useState} from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import ErrorModal from './components/UI/ErrorModal';
import Wrapper from './components/Helpers/Wrapper';

const App = () => {
  // States
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState({title: '', message: ''});

  // Handlers
  const editUsers = user => setUsersData(prev => [...prev, user]);
  const editError = ({title, message}) => setError({title, message});

  return (
    <Wrapper>
      <AddUser onAddUser={editUsers} onError={editError} />
      <UsersList users={usersData} />
      {error.title && (
        <ErrorModal
          title={error.title}
          message={error.message}
          hideError={() => editError({title: '', message: ''})}
        />
      )}
    </Wrapper>
  );
};

export default App;
