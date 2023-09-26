import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  VStack,
  Text,
  Divider,
  HStack,
  IconButton,
  Spinner,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Employee, Skill } from "../types/employee.type";
import { DeleteIcon } from "@chakra-ui/icons";

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (formData: Employee) => void;
}

const initialSkill: Skill = {
  skill: "",
  seniority: "Basic",
  yearsOfExperience: 0,
};

const initialFormData: Employee = {
  id: "",
  firstName: "",
  lastName: "",
  dob: "",
  contactNumber: "",
  email: "",
  streetAddress: "",
  city: "",
  country: "",
  postalcode: "",
  skills: [],
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSubmit }) => {
  const [formData, setFormData] = useState<Employee>(
    employee || initialFormData
  );
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (employee) {
      // Populate form data when editing an existing employee
      setFormData(employee);
    } else {
      // Clear form data when creating a new employee
      setFormData(initialFormData);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const errors: Record<string, string> = { ...validationErrors };
    if (!value) {
      errors[name] = `${name} is required`;
    } else {
      errors[name] = "";
    }
    setValidationErrors(errors);
  };

  const handleSkillChange = (
    index: number,
    key: string,
    value: string | number
  ) => {
    setFormData((prevData) => {
      const skills = [...prevData.skills];

      skills[index] = {
        ...skills[index],
        [key]: String(value),
      };

      return {
        ...prevData,
        skills,
      };
    });
  };

  const handleAddSkill = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, { ...initialSkill }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Perform final validation before submission
    const errors: Record<string, string> = {};
    if (!formData.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!formData.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.streetAddress) {
      errors.streetAddress = "Street Address is required";
    }
    if (!formData.city) {
      errors.city = "City is required";
    }
    if (!formData.country) {
      errors.country = "Country is required";
    }
    if (!formData.postalcode) {
      errors.postalcode = "Postal Code is required";
    }

    if (Object.values(errors).some((error) => error !== "")) {
      // There are validation errors, do not submit
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Text fontSize="lg" fontWeight="bold" color="blue.500">
              Basic Information
            </Text>
            <HStack>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {validationErrors.firstName && (
                  <Text color="red">{validationErrors.firstName}</Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {validationErrors.lastName && (
                  <Text color="red">{validationErrors.lastName}</Text>
                )}
              </FormControl>
            </HStack>
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contact Number</FormLabel>
              <Input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {validationErrors.email && (
                <Text color="red">{validationErrors.email}</Text>
              )}
            </FormControl>
            <Text fontSize="lg" fontWeight="bold" color="blue.500">
              Address Information
            </Text>
            <FormControl>
              <FormLabel>Street Address</FormLabel>
              <Input
                required
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
              />
              {validationErrors.streetAddress && (
                <Text color="red">{validationErrors.streetAddress}</Text>
              )}
            </FormControl>
            <HStack>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {validationErrors.city && (
                  <Text color="red">{validationErrors.city}</Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  required
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
                {validationErrors.country && (
                  <Text color="red">{validationErrors.country}</Text>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Postal Code</FormLabel>
                <Input
                  required
                  type="text"
                  name="postalcode"
                  value={formData.postalcode}
                  onChange={handleChange}
                />
                {validationErrors.postalcode && (
                  <Text color="red">{validationErrors.postalcode}</Text>
                )}
              </FormControl>
            </HStack>

            <Text fontSize="lg" fontWeight="bold" color="blue.500">
              Skills
            </Text>
            {formData.skills.map((skill, index) => (
              <HStack key={index} alignItems="flex-end" display="flex">
                <FormControl>
                  <FormLabel>Skill</FormLabel>
                  <Input
                    required
                    type="text"
                    value={skill.skill}
                    onChange={(e) =>
                      handleSkillChange(index, "skill", e.target.value)
                    }
                  />
                  {validationErrors[`skills[${index}].skill`] && (
                    <Text color="red">
                      {validationErrors[`skills[${index}].skill`]}
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Seniority</FormLabel>
                  <Select
                    name="seniority"
                    value={skill.seniority}
                    onChange={(e) =>
                      handleSkillChange(index, "seniority", e.target.value)
                    }
                  >
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Yrs of Exp</FormLabel>
                  <NumberInput
                    value={skill.yearsOfExperience}
                    onChange={(e) =>
                      handleSkillChange(
                        index,
                        "yearsOfExperience",
                        parseInt(e)
                      )
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  {validationErrors[`skills[${index}].yearsOfExperience`] && (
                    <Text color="red">
                      {validationErrors[`skills[${index}].yearsOfExperience`]}
                    </Text>
                  )}
                </FormControl>
                <IconButton
                  aria-label="Delete Skill"
                  icon={<DeleteIcon />}
                  size="md"
                  onClick={() => {
                    setFormData((prevData) => {
                      const skills = [...prevData.skills];
                      skills.splice(index, 1);
                      return {
                        ...prevData,
                        skills,
                      };
                    });
                  }}
                />
              </HStack>
            ))}
            <Button
              type="button"
              onClick={handleAddSkill}
              colorScheme="blue"
              variant="outline"
              width="80px"
            >
              Add Skill
            </Button>

            <Divider />

            {isLoading ? (
              <Spinner size="lg" color="blue.500" />
            ) : (
              <Button
                colorScheme="blue"
                onClick={handleSubmit}
                isDisabled={
                  Object.values(validationErrors).some((error) => error !== "") ||
                  !formData.skills.length // Disable if there are skill errors or no skills
                }
              >
                {employee ? "Edit Employee" : "Add Employee"}
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </VStack>
  );
};

export default EmployeeForm;
