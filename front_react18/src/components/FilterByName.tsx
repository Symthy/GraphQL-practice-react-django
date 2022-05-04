import { useLazyQuery } from '@apollo/client';
import { Search } from '@mui/icons-material';
import React, { ChangeEvent, useState } from 'react';
import { SEARCH_EMPLOYEE } from '../queries';
import styles from './FilterByName.module.css';

export const FilterByName = () => {
  const [searchByName, setSearchByName] = useState("");
  const [searchEmployee,
    {data: dataSearch, error: errorSearch}
  ] = useLazyQuery<EmployeeData, EmployeeSearchByNameVars>(SEARCH_EMPLOYEE,
    { fetchPolicy: "network-only"}
    )
  const onChange: (e: ChangeEvent<HTMLInputElement>) => void = e => setSearchByName(e.target.value);
  return (
    <>
      <h3>Filter by Employee Name</h3>
      <input
        placeholder="specified employee name"
        type="text"
        value={searchByName}
        onChange={e => setSearchByName(e.target.value)}
      />

      <Search
        className={styles.filterByName__search}
        onClick={async () => {
          await searchEmployee({
            variables: { name: searchByName }
          });
          setSearchByName("");
        }}
      />

      {errorSearch && <h4>{errorSearch.message}</h4>}
      {dataSearch && (
        <ul className={styles.filterByName__list}>
          {dataSearch?.allEmployees.edges.map(employee => (
            <li className={styles.filterByName__item} key={employee.node.id}>
              {employee.node.name + " / " + employee.node.joinYear + " / " + employee.node.department.departmentName}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
