import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Layout from '../../components/layout';
import { render } from '../testUtil'
import '@testing-library/jest-dom';

describe('Layout Component', () => {
  it('renders the component', () => {
    render(<Layout>Hello World</Layout>);
    
    expect(screen.getByText('Employees')).toBeInTheDocument();
    expect(screen.getByText('New Employee')).toBeInTheDocument();
    expect(screen.queryByText('Creating...')).toBeNull(); // This should not be rendered initially
  });

  it('opens the drawer when the "New Employee" button is clicked', () => {
    const { getByText } = render(<Layout>Hello World</Layout>);
    const newEmployeeButton = getByText('New Employee');

    fireEvent.click(newEmployeeButton);

    expect(screen.getByText('Create New Employee')).toBeInTheDocument();
  });
});
