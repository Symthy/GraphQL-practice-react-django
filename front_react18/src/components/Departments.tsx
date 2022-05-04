import { useMutation } from '@apollo/client';
import { Delete } from '@mui/icons-material';
import React, { useContext } from 'react';
import { StateContext } from '../context/StateContext';
import { CREATE_DEPARTMENT, DELETE_DEPARTMENT, GET_DEPARTMENTS, GET_EMPLOYEES } from '../queries';
import styles from './Departments.module.css';

type DepartmentsProps = {
  dataDepartments: DepartmentData | undefined
}


export const Departments = ({ dataDepartments }: DepartmentsProps) => {
  const { departmentName, setDepartmentName } = useContext(StateContext)
  const [createDepartment] = useMutation(CREATE_DEPARTMENT, {
    refetchQueries: [{query: GET_DEPARTMENTS}]
  })
  const [deleteDepartment] = useMutation(DELETE_DEPARTMENT, {
    refetchQueries: [{query: GET_DEPARTMENTS}, {query: GET_EMPLOYEES}]
  })
  return (
    <>
      <h3>Department List</h3>
      <input
        className={styles.departments__input}
        placeholder="department name"
        type="text"
        value={departmentName}
        onChange={event => setDepartmentName(event.target.value)}
      />

      <button
        disabled={!departmentName}
        onClick={async () => {
          try {
            await createDepartment({
              variables: { departmentName: departmentName }
            });
          } catch (err: any) {
            alert(err.message);
          }
          setDepartmentName("");
        }}
      >New Department</button>

      <ul
        className={styles.departments__list}
      >
        {dataDepartments?.allDepartments &&
          dataDepartments.allDepartments.edges.map(dept =>
            <li className={styles.departments__item} key={dept.node.id}>
              <span>{dept.node.departmentName}</span>
              <Delete
                className={styles.departments__delete}
                onClick={async () => {
                  try {
                    await deleteDepartment({
                      variables: {id: dept.node.id}
                    })
                  } catch (err: any) {
                    alert(err.message);
                  }
                }}
              />
            </li>
          )}
      </ul>
    </>
  )
}
