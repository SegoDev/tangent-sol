import React, { useState } from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  VStack,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  List,
  ListItem,
  Container,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Employee } from "../types/employee.type";
import EmployeeForm from "./EmployeeForm";
import { mutate } from "swr";
import { FETCH_KEY } from "@/utils/constants";
import NoEmployees from "./NoEmployees";

interface EmployeeListProps {
  employees?: Employee[];
}

const TableHeadings = [
  "First Name",
  "Last Name",
  "Contact",
  "Email",
  "Skills",
  "Actions",
];

const EmployeeList = ({ employees }: EmployeeListProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    onOpen();
  };

  const deleteEmployee = async (id: string) => {
    setIsLoading(true);
    try {
      await fetch(`/api/employees/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      mutate(FETCH_KEY);
      toast({
        title: "Employee Deleted",
        description: "The employee has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Error Deleting Employee",
        description: "An error occurred while deleting the employee.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateEmployee = async (updatedEmployee: Employee) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/employees/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (response.status === 200) {
        // trigger a revalidation (refetch) to make sure our local data is correct
        mutate(FETCH_KEY);
        onClose();
        toast({
          title: "Employee Updated",
          description: "The employee has been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Handle error cases
        console.error('Error updating employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      toast({
        title: "Error Updating Employee",
        description: "An error occurred while updating the employee.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {employees && employees.length > 0 ? (
      <>
        {
          isLoading ? 
            <Container centerContent>
              <Spinner size={'xl'} thickness='3px' data-testid='loading-spinner'/>
            </Container> :
            (
              <>
                <VStack align="stretch" spacing={4}>
                  <Text fontSize="lg">There are <b>{employees.length}</b> employees</Text>
                  <Table variant="simple" colorScheme="gray">
                    <Thead>
                      <Tr bg={'gray.200'}>
                        {TableHeadings.map((heading, index) => (
                          <Th key={index} color={'gray.800'}>{heading}</Th>
                        ))}
                      </Tr>
                    </Thead>
                    <Tbody>
                      {employees.map((employee) => (
                        <Tr key={employee.id}>
                          <Td>{employee.firstName}</Td>
                          <Td>{employee.lastName}</Td>
                          <Td>{employee.contactNumber}</Td>
                          <Td>{employee.email}</Td>
                          <Td>
                            <List listStyleType={'none'}>
                              {employee.skills.map((skill, skillIndex) => (
                                <ListItem key={skillIndex}>
                                  {skill.skill} ({skill.seniority})
                                </ListItem>
                              ))}
                            </List>
                          </Td>
                          <Td>
                            <Button
                              colorScheme="blue"
                              size="sm"
                              onClick={() => handleEditClick(employee)}
                              mx={1}
                            >
                              Edit
                            </Button>
                            <Button colorScheme="red" size="sm" mx={1} onClick={() => deleteEmployee(employee.id)}>
                              Delete
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </VStack>
                <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Edit Employee</DrawerHeader>
                    <DrawerBody>
                      <EmployeeForm
                        employee={selectedEmployee}
                        onSubmit={(updatedEmployee) => updateEmployee(updatedEmployee)}
                      />
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            )
        }
      </>
    ) : <NoEmployees />}
    </>
  );
};

export default EmployeeList;
