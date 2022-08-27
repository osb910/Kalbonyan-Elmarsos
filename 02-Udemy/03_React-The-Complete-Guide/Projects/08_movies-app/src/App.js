import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        'https://react-http-44a9f-default-rtdb.firebaseio.com/movies.json'
      );
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await res.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releasDate: data[key].releasDate,
        });
      }
      setMovies(loadedMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleFetchMovies();
  }, [handleFetchMovies]);

  const handleAddMovie = async movie => {
    const res = await fetch(
      'https://react-http-44a9f-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    console.log(data);
  };

  let content =
    movies.length > 0 ? (
      <MoviesList movies={movies} />
    ) : error ? (
      <p>{error}</p>
    ) : isLoading ? (
      <p>Loading...</p>
    ) : (
      <p>Found no movies.</p>
    );

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={handleAddMovie} />
      </section>
      <section>
        <button onClick={handleFetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
