import * as React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { EmployeesContext } from "@/context/EmployeesContextProvider";
import { mockEmployees } from "@/utils/mockData";

jest.doMock("../context/EmployeesContextProvider.tsx", () => ({
  default: React.createContext({}),
}));

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>
    <EmployeesContext.Provider value={{ employees: mockEmployees, setEmployees: jest.fn() }}>
      {children}
    </EmployeesContext.Provider>
  </ChakraProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };