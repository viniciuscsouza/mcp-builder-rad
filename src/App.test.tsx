import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders main layout', () => {
    render(<App />);
    const headline = screen.getByRole('heading', {
      name: /mcp rad server builder/i,
    });
    expect(headline).toBeInTheDocument();
  });
});