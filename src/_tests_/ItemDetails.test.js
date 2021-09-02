import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import ItemDetails from '../components/ItemDetails';
import store from './test_store/index';

describe('rendered ItemDetails', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });
  const match = {
    params: { id: '1' },
  };

  test('has Text element', () => {
    waitForElement(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <ItemDetails match={match} />
          </BrowserRouter>
        </Provider>,
        container,
      );
    });

    const element = screen.getByText(/Rent item/i);
    expect(element).toBeInTheDocument();
  });
});
