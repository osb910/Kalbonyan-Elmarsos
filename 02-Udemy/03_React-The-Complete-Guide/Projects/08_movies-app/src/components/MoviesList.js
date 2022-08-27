import React from 'react';
import styled from 'styled-components';
import Movie from './Movie';

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MovieList = props => {
  return (
    <StyledList>
      {props.movies.map(movie => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </StyledList>
  );
};

export default MovieList;
