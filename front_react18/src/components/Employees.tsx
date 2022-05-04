import { useMutation } from '@apollo/client'
import { Delete, DragIndicator, Edit } from '@mui/icons-material'
import React, { useContext } from 'react'
import { StateContext } from '../context/StateContext'
import { DELETE_EMPLOYEE, GET_EMPLOYEES } from '../queries'
import styles from './Employees.module.css'

type EmployeeProps = {
  dataEmployees: EmployeeData|undefined
}

export const Employees = ({dataEmployees}: EmployeeProps) => {
  const {
    setName,
    setJoinYear,
    setSelectedDepartment,
    setEditedId,
    dataSingleEmployee,
    getSingleEmployee,
  } = useContext(StateContext)

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  const employeeEdges = dataEmployees?.allEmployees?.edges
  return (
    <>
      <h3>Employee List</h3>
      {employeeEdges && (
        <ul className={styles.employees__list}>
        {employeeEdges.map(employee =>
          <li className={styles.employees__item} key={employee.node.id}>
            <span>
              {employee.node.name} {" / "}
              {employee.node.joinYear} {" / "}
              {employee.node.department && employee.node.department.departmentName}
            </span>
            <div>
              <Delete
                className={styles.employees__delete}
                onClick={async () => {
                  try {
                    await deleteEmployee({
                      variables: { id: employee.node.id }
                    });
                  } catch (err: any) {
                    alert(err.message)
                  }
                  if (employee.node.id === dataSingleEmployee?.employee?.id) {
                    await getSingleEmployee({
                      variables: {
                        id: employee.node.id,
                      },
                    });
                  }
                }}
              />

              <Edit
                className={styles.employees__edit}
                onClick={() => {
                  setEditedId(employee.node.id);
                  setName(employee.node.name);
                  setJoinYear(employee.node.joinYear);
                  setSelectedDepartment(employee.node.department.id);
                }}
              />

              <DragIndicator
                className={styles.employees_detail}
                onClick={async () => {
                  try {
                    await getSingleEmployee({
                      variables: { id: employee.node.id }
                    });
                  } catch (err: any) {
                    alert(err.message);
                  }
                }}
              />
            </div>
          </li>
        )}
        </ul>
      )}
    </>
  );
}
