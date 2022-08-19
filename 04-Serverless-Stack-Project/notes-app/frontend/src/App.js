/** TODOs
 * edit translator color
 * edit translator size
 * fix lang context
 */

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Routes from './Routes';
import Translator from './components/Layout/Translator/Translator';
import {LinkContainer} from 'react-router-bootstrap';
import './App.css';

const App = () => {
  return (
    <div className='App container py-3'>
      <Navbar collapseOnSelect bg='light' expand='md' className='mb-3'>
        <LinkContainer to='/'>
          <Navbar.Brand className='font-weight-bold text-muted'>
            Scratch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Translator />
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to='/signup'>
              <Nav.Link>Signup</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
};

export default App;
