import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import EmployeeForm from '../../components/EmployeeForm';
import { render } from '../testUtil';
import '@testing-library/jest-dom';

describe('EmployeeForm component', () => {
  it('renders the form with initial values when creating a new employee', async () => {
    const onSubmit = jest.fn();
    render(<EmployeeForm onSubmit={onSubmit} />);

    // Verify that form fields are rendered with initial values
    expect(screen.getByLabelText('First Name')).toHaveValue('');
    expect(screen.getByLabelText('Last Name')).toHaveValue('');
    expect(screen.getByLabelText('Email')).toHaveValue('');
  });

  it('renders the form with employee data when editing an employee', async () => {
    const employee = {
      "id": "AB1234",
      "firstName": "John",
      "lastName": "Doe",
      "dob": "1990-05-15",
      "contactNumber": "123-456-7890",
      "email": "john@example.com",
      "streetAddress": "123 Main St",
      "city": "New York",
      "country": "USA",
      "postalcode": "10001",
      "skills": [
        {
          "skill": "JavaScript",
          "seniority": "Intermediate",
          "yearsOfExperience": 4
        },
        {
          "skill": "React",
          "seniority": "Advanced",
          "yearsOfExperience": 5
        }
      ]
    };
    const onSubmit = jest.fn();
    render(<EmployeeForm employee={employee} onSubmit={onSubmit} />);

    // Verify that form fields are populated with employee data
    expect(screen.getByLabelText('First Name')).toHaveValue('John');
    expect(screen.getByLabelText('Last Name')).toHaveValue('Doe');
    // ... (repeat for other fields)
  });

  it('prevents submission when fields are empty', async () => {
    const onSubmit = jest.fn();
    render(<EmployeeForm onSubmit={onSubmit} />);

    const submitButton = screen.getByText('Add Employee'); // Adjust for edit mode

    // Attempt to submit the form with empty fields
    fireEvent.click(submitButton);

    // Verify that onSubmit is not called
    expect(onSubmit).not.toBeCalled();
  });

  it('disables the submit button when there are validation errors', async () => {
    const onSubmit = jest.fn();
    render(<EmployeeForm onSubmit={onSubmit} />);

    const submitButton = screen.getByText('Add Employee'); // Adjust for edit mode

    // Fill in invalid form data to trigger validation errors
    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'Doe' },
    });
    // ... (repeat for other fields)

    // Verify that the submit button is disabled
    expect(submitButton).toBeDisabled();
  });
});
