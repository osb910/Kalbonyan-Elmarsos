import {Fragment, useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap';
import {Auth} from 'aws-amplify';
import {useNavigate} from 'react-router-dom';

import AppContext from './lib/contextLib';
import data from './lib/content/header';
import Translator from './components/Layout/Translator';
import styled from 'styled-components';

const StyledNavigation = styled.header`
  .logo {
    margin-inline-start: 0.5em;
  }

  .navbtns {
    margin-inline-start: 0.5em;
  }

  .navbtns > * {
    max-width: fit-content;
    margin-block: 0.5em;
    padding-inline: 0.8em;
  }

  .rtl & .logo {
    font-size: 1.5rem;
    font-weight: 700;
  }

  & .link {
    padding: 0.2em;
  }

  .rtl & .link {
    font-size: 1.3rem;
    font-family: Lotus;
  }

  .nav {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }
`;

const Navigation = () => {
  const nav = useNavigate();
  const {lang, isAuth, onChangeLang, setIsAuth} = useContext(AppContext);
  const content = data[lang];

  const handleTranslator = evt => {
    const newLang = evt.target.dataset.lang;
    if (!newLang || lang === newLang) return;
    onChangeLang(newLang);
  };

  const logout = async () => {
    try {
      await Auth.signOut();
      setIsAuth('LOGOUT');
      nav('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledNavigation>
      <Navbar collapseOnSelect bg='light' expand='md' className='mb-3'>
        <LinkContainer to='/'>
          <Navbar.Brand className='font-weight-bold text-muted logo'>
            {content.logo}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className='navbtns justify-content-end'>
          <Translator lang={lang} changeLang={handleTranslator} />
          <Nav className='nav' activeKey={window.location.pathname}>
            {isAuth ? (
              <LinkContainer className='link' to='/logout'>
                <Nav.Link onClick={logout}>{content.logout}</Nav.Link>
              </LinkContainer>
            ) : (
              <Fragment>
                <LinkContainer className='link' to='/signup'>
                  <Nav.Link>{content.signup}</Nav.Link>
                </LinkContainer>
                <LinkContainer className='link' to='/login'>
                  <Nav.Link>{content.login}</Nav.Link>
                </LinkContainer>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </StyledNavigation>
  );
};

export default Navigation;
