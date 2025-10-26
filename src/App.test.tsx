import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders login form', () => {
    render(<App />);
    const headline = screen.getByRole('heading', { name: /login/i });
    expect(headline).toBeInTheDocument();
  });
});