import {useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {LinkContainer} from 'react-router-bootstrap';
import LanguageContext from './store/language-context';
import data from './store/content/header';
import Translator from './components/Layout/Translator/Translator';
import styled from 'styled-components';

const StyledNavigation = styled.header`
  .rtl & .logo {
    font-size: 1.4rem;
    font-weight: 700;
  }

  .rtl & .link {
    font-size: 1.25rem;
  }
`;

const Navigation = () => {
  const {lang, onChangeLang} = useContext(LanguageContext);
  const content = data[lang];

  const handleTranslator = evt => {
    const newLang = evt.target.dataset.lang;
    if (!newLang || lang === newLang) return;
    onChangeLang(newLang);
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
        <Navbar.Collapse className='justify-content-end'>
          <Translator lang={lang} changeLang={handleTranslator} />
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to='/signup'>
              <Nav.Link className='link'>{content.signup}</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link className='link'>{content.login}</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </StyledNavigation>
  );
};

export default Navigation;
