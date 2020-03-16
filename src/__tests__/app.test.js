import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import App from '../components/app';

import rootReducer from '../reducers';

test('renders the app', () => {
  const store = createStore(rootReducer);
  const { getByText } = render(<Provider store={store}><App /></Provider>);
  const linkElement = getByText(/magicbooks inc./i);
  expect(linkElement).toBeInTheDocument();
});
