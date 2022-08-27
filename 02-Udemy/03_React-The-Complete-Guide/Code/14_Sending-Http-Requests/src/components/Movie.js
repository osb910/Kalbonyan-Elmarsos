import React from 'react';
import styled from 'styled-components';

const StyledMovie = styled.li`
  margin: 1rem;
  padding: 1rem;
  background-color: #230052;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  text-align: center;
  color: white;

  & h2 {
    font-size: 2rem;
    color: #f7e702;
  }

  & h3 {
    color: #eccf77;
    margin: 0;
    font-size: 1rem;
  }
`;

const Movie = props => {
  return (
    <StyledMovie>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
    </StyledMovie>
  );
};

export default Movie;
