import React, {useRef} from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  .control {
    margin: 1rem 0;
  }

  .control label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  .control input,
  .control textarea {
    display: block;
    width: 100%;
    font: inherit;
    padding: 0.2rem;
    border-radius: 12px;
    border: 1px solid #ccc;
  }

  .control input:focus,
  .control textarea:focus {
    outline: none;
    border-color: #230052;
  }
`;

function AddMovie(props) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(movie);
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <div className='control'>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className='control'>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef}></textarea>
      </div>
      <div className='control'>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </StyledForm>
  );
}

export default AddMovie;
