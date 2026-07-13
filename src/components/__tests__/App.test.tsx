import { vi, test, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

test('renders App successfully', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Just a basic check that something renders
  expect(screen.getByRole('main', { hidden: true })).toBeInTheDocument();
});
