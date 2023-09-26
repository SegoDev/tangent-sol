import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import EmployeesContextProvider from '@/context/EmployeesContextProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <EmployeesContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </EmployeesContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
