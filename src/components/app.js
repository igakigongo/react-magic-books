import React from 'react';
import '../app.css';
import { Container, Navbar } from 'react-bootstrap';
import { BooksForm, BooksList } from '../containers';

const App = () => (
  <>
    <Navbar bg="success" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#">MagicBooks Inc.</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
      </Container>
    </Navbar>
    <Container>
      <BooksList />
      <BooksForm />
    </Container>
  </>
);

export default App;
