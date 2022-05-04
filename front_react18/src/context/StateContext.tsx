import { ApolloError, LazyQueryExecFunction, useLazyQuery } from "@apollo/client";
import { createContext, useState } from "react";
import { GET_SINGLE_EMPLOYEE } from "../queries";

type ContextValues =  {
  name: string,
  setName: (name: string) => void,
  joinYear: number,
  setJoinYear: (joinYear: number) => void,
  departmentName: string,
  setDepartmentName: (departmentName: string) => void,
  selectedDepartment: string,
  setSelectedDepartment: (selectedDepartment: string) => void,
  editedId: string,
  setEditedId: (editedId: string) => void,
  dataSingleEmployee: EmployeeSingleData | undefined,
  errorSingleEmployee: ApolloError | undefined,
  getSingleEmployee: LazyQueryExecFunction<EmployeeSingleData, EmployeeSingleVars>,
}

type StateContextProviderProps = {
  children: React.ReactNode
}

export const StateContext = createContext<ContextValues>(undefined!);

export const StateContextProvider = ({children}: StateContextProviderProps) => {
  const [name, setName] = useState("");
  const [joinYear, setJoinYear] = useState(2022);
  const [departmentName, setDepartmentName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [editedId, setEditedId] = useState("");

  const [
    getSingleEmployee,
    { data: dataSingleEmployee, error: errorSingleEmployee },
  ] = useLazyQuery<EmployeeSingleData, EmployeeSingleVars>(GET_SINGLE_EMPLOYEE, {
    fetchPolicy: "network-only"
  });

  return (
    <StateContext.Provider value={
      {
        name,
        setName,
        joinYear,
        setJoinYear,
        departmentName,
        setDepartmentName,
        selectedDepartment,
        setSelectedDepartment,
        editedId,
        setEditedId,
        dataSingleEmployee,
        errorSingleEmployee,
        getSingleEmployee,
      }
    }>{children}</StateContext.Provider>
  )
}
