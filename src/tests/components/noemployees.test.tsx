import React from 'react';
import { screen } from '@testing-library/react';
import NoEmployees from '../../components/NoEmployees';
import { render } from '../testUtil';
import '@testing-library/jest-dom';

describe('NoEmployees component', () => {
  it('renders the "No Employees Found" message', () => {
    render(<NoEmployees />);
    const messageElement = screen.getByText('No Employees Found');
    expect(messageElement).toBeInTheDocument();
  });

  it('renders the image with the correct attributes', () => {
    render(<NoEmployees />);
    const imageElement = screen.getByAltText('No Employees');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', '/undraw_empty.svg');
  });
});
