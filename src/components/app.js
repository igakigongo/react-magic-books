import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import '../app.css';
import { Container, Navbar } from 'react-bootstrap';
import { BooksForm, BooksList } from '../containers';

const App = () => (
  <ToastProvider placement="bottom-center" autoDismiss autoDismissTimeout={3000}>
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
  </ToastProvider>
);

export default App;
