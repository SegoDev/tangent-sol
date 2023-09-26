import { Container, Flex, Heading, Image, Text } from "@chakra-ui/react";

const NoEmployees = () => {
  return (
    <Container centerContent>
    <Flex flexDir='column'>
      <Heading as="h2" size="xl" color={'gray.700'}>No Employees Found</Heading>
      <Image
        src="/undraw_empty.svg"
        alt="No Employees"
        height={'550'}
        width={'1000'}
      />
      <Text variant="h4" color="gray.700">
        Create a new employee by clicking the <b>New Employee</b> button to get started
      </Text>
    </Flex>
  </Container>
  );
}
 
export default NoEmployees;