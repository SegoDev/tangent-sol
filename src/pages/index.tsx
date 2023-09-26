import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Box, Container, Spinner } from '@chakra-ui/react'
import EmployeeList from '../components/EmployeeList'
import { EmployeesContext } from '@/context/EmployeesContextProvider'
import { useContext } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { employees, isLoading } = useContext(EmployeesContext);
  return (
    <>
      <Head>
        <title>S.Makhutja Tangent Assessment</title>
        <meta name="description" content="Tangent Solution Technical Assessment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={`${inter.className}`} height={'100dvh'} width={'100dvw'} p={8}>
        {isLoading ? 
          <Container centerContent>
            <Spinner size={'xl'} thickness='3px'/>
          </Container> : <EmployeeList employees={employees} />
        }
      </Box>
    </>
  )
};

// SSR option
// export const getServerSideProps = async () => {
//   const employees = await prisma.employee.findMany({});
//   console.log('employees', employees)
//   return {
//     props: {
//       employees,
//     },
//   };
// }