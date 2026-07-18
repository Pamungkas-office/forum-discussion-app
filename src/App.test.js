import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './states/store';
import App from './App';

test('renders forum app', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const brandElement = screen.getByText(/ForumKu/i);
  expect(brandElement).toBeInTheDocument();
});
