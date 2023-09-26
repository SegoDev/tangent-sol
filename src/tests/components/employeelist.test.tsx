import React from 'react';
import EmployeeList from '../../components/EmployeeList';
import { render } from '../testUtil';
import { mockEmployees } from '@/utils/mockData';
import '@testing-library/jest-dom';
import { Employee } from '@/types/employee.type';

describe('EmployeeList component', () => {
  it('renders the employee table correctly', () => {

    const { getByText, getAllByRole } = render(<EmployeeList employees={mockEmployees} />);
  
    // Assertions for the table headers
    expect(getByText('First Name')).toBeInTheDocument();
    expect(getByText('Last Name')).toBeInTheDocument();
    expect(getByText('Contact')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Skills')).toBeInTheDocument();
    expect(getByText('Actions')).toBeInTheDocument();
  
    // Assertions for the employee data
    mockEmployees.forEach((data: Employee) => {
      expect(getByText(data.firstName)).toBeInTheDocument();
      expect(getByText(data.lastName)).toBeInTheDocument();
      expect(getByText(data.contactNumber)).toBeInTheDocument();
      expect(getByText(data.email)).toBeInTheDocument();
    });
  
    // Assertions for edit and delete buttons
    const editButtons = getAllByRole('button', { name: 'Edit' });
    const deleteButtons = getAllByRole('button', { name: 'Delete' });
  
    expect(editButtons).toHaveLength(mockEmployees.length);
    expect(deleteButtons).toHaveLength(mockEmployees.length);
  });
});
