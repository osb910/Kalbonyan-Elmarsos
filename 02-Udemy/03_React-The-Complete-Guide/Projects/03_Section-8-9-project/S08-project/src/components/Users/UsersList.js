import React from 'react';
import styled from 'styled-components';

const StyledList = styled.ul`
  margin: 2em auto;
  padding: 1em;
  width: 90%;
  max-width: 40rem;
  list-style-type: none;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;

  & li {
    border: 1px solid #ccc;
    margin: 0.5rem 0;
    padding: 0.5rem;
  }
`;

const UsersList = ({users}) => {
  return (
    <StyledList>
      {users.map(({name, age, id}) => (
        <li key={id}>
          {name} ({age} years old)
        </li>
      ))}
    </StyledList>
  );
};

export default UsersList;
