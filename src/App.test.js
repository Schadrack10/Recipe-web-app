import { render, screen } from '@testing-library/react';
import AuthForm from './components/Auth/AuthForm'
// import AuthForm
import App from './App';

test('renders learn react link', () => {
  render(<AuthForm />);
  const emailLabelElement = screen.getByText(/Your Email/i);
  expect(emailLabelElement).toBeInTheDocument();
});
