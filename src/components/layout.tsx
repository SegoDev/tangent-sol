import React, { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Button,
  Container,
  Heading,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Select,
  useToast,
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import EmployeeForm from "./EmployeeForm";
import { Employee, Skill } from "@/types/employee.type";
import { constructEmployeeId } from "@/utils";
import { mutate } from "swr";
import { FETCH_KEY } from "@/utils/constants";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<Skill['skill']>("basic");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleCreateEmployee = async (formData: Employee) => {
    if (!formData) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/employees/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: constructEmployeeId(),
          skills: formData.skills.map((skill) => ({
            ...skill,
            yearsOfExperience: Number(skill.yearsOfExperience),
          })),
        }),
      });
  
      if (response.status === 201) {
        mutate(FETCH_KEY);
        onClose();
        toast({
          title: "Employee Created",
          description: "The employee has been successfully created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error('Error creating employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      toast({
        title: "Error Creating Employee",
        description: "An error occurred while creating the employee.",
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
      <Box bg={"gray.700"} px={8}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack
            spacing={8}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <VStack>
              <Heading as="h1" size={"xl"} color={"white"}>
                Employees
              </Heading>
            </VStack>
            <HStack>
              <SearchInput onChange={() => {}} />
              <Select
                value={selectedFilter}
                onChange={() => {}}
                color={'white'}
                size="md"
                placeholder="Filter by skills"
              >
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advance">Advance</option>
                <option value="expert">Expert</option>
              </Select>
            </HStack>
          </HStack>
          <Flex alignItems={"center"} mx={2}>
            <Button
              variant={"solid"}
              colorScheme={"purple"}
              size={"md"}
              leftIcon={<AddIcon />}
              onClick={onOpen}
            >
              {isLoading ? "Creating..." : "New Employee"}
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create New Employee</DrawerHeader>
          <DrawerBody>
            <EmployeeForm onSubmit={handleCreateEmployee} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Container maxW="2xl" centerContent padding="4">
        {children}
      </Container>
    </>
  );
};

export default Layout;