import React from 'react';
import logo from './logo.svg';
import './app.css';

const App = () => (
  <div className="app">
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <p>Magic - books Inc</p>
      <small>
        <a
          className="app-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered with ReactJS
        </a>
      </small>
    </header>
  </div>
);

export default App;
