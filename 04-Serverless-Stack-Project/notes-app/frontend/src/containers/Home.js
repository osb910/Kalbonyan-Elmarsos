import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {API} from 'aws-amplify';
import ListGroup from 'react-bootstrap/ListGroup';
import {LinkContainer} from 'react-router-bootstrap';
import {BsPencilSquare} from 'react-icons/bs';
import AppContext from '../store/app-context';
import data from '../store/content/home';

const StyledHome = styled.main`
  & .lander {
    padding: 80px 0;
    text-align: center;
  }

  :not(.rtl) & .lander h1 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
  }

  .rtl & .lander p {
    font-family: Lotus;
    font-size: 1.2rem;
  }
`;

const Home = () => {
  const {lang, isAuth} = useContext(AppContext);
  const uiText = data[lang];
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadNotes = () => API.get('notes', '/notes');

  useEffect(() => {
    const onLoad = async () => {
      if (!isAuth) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    onLoad();
  }, [isAuth]);

  const renderNotesList = notes => {
    return (
      <>
        <LinkContainer to='/notes/new'>
          <ListGroup.Item action className='py-3 text-nowrap text-truncate'>
            <BsPencilSquare size={17} />{' '}
            <span className='ml-2 font-weight-bold'>{uiText.createNote}</span>
          </ListGroup.Item>
        </LinkContainer>
        {notes.map(({noteId, content, createdAt}) => (
          <LinkContainer key={noteId} to={`/notes/${noteId}`}>
            <ListGroup.Item action dir='auto'>
              <span className='font-weight-bold'>
                {content.trim().split('\n')[0]}
              </span>
              <br />
              <span className='text-muted'>
                {uiText.created}
                {new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : lang, {
                  timeStyle: 'short',
                  dateStyle: 'short',
                }).format(new Date(createdAt))}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  };

  const lander = (
    <section className='lander'>
      <h1>{uiText.appName}</h1>
      <p className='text-muted'>{uiText.appDesc}</p>
    </section>
  );

  const notesList = (
    <section className='notes'>
      <h2 className='pb-3 mt-4 mb-3 border-bottom'>{uiText.yourNotes}</h2>
      <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
    </section>
  );
  return <StyledHome>{isAuth ? notesList : lander}</StyledHome>;
};

export default Home;
