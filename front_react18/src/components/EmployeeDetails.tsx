import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';

export const EmployeeDetails = () => {
  const {
    dataSingleEmployee,
    errorSingleEmployee,
  } = useContext(StateContext)

  if (errorSingleEmployee) {
    return (
      <>
        <h3>Employee Details</h3>
        {errorSingleEmployee.message}
      </>
    );
  }
  const employee = dataSingleEmployee?.employee
  return (
    <>
      <h3>Employee Details</h3>
      {employee && (
        <>
          <h4>ID: </h4>
          {employee.id}
          <h4>Name: </h4>
          {employee.name}
          <h4>Join Year: </h4>
          {employee.joinYear}
          <h4>Department Name: </h4>
          {employee.department.departmentName}
        </>
      )}
    </>
  )
}
