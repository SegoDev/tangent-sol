import React, { createContext, useState, useEffect } from "react";
import { Employee } from "../types/employee.type";
import { FETCH_KEY } from "@/utils/constants";
import useSWR from "swr";

interface EmployeesContextProps {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  isLoading?: boolean;
}

export const EmployeesContext = createContext<EmployeesContextProps>({
  employees: [],
  setEmployees: () => {},
  isLoading: false,
});

type EmployeeDataProviderProps = {
  children: React.ReactNode;
};


const EmployeesContextProvider: React.FC<EmployeeDataProviderProps> = ({ children }) => {
  const [ employees, setEmployees ] = useState<Employee[]>([]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(FETCH_KEY, fetcher);

  if (error) {
    console.error('Error fetching data:', error);
  };

  useEffect(() => {
    if (data) {
      setEmployees(data);
    }
  }, [data]);

  return (
    <EmployeesContext.Provider value={{ employees, setEmployees, isLoading }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContextProvider;
