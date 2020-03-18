import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import '../app.css';
import {
  Container, Navbar, Nav, Image,
} from 'react-bootstrap';
import { BooksForm, BooksList } from '../containers';

const App = () => (
  <ToastProvider placement="bottom-center" autoDismiss autoDismissTimeout={3000}>
    <Navbar bg="light" className="shadow-lg" expand="lg" variant="light">
      <Container>
        <Navbar.Brand href="#">BookStore CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">Books</Nav.Link>
            <Nav.Link href="#">Categories</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="#">
              <Image alt="profile" className="gravatar" roundedCircle src="http://www.gravatar.com/avatar/?d=mp&s=32" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
      <BooksList />
      <BooksForm />
    </Container>
  </ToastProvider>
);

export default App;
