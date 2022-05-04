import { useLazyQuery } from '@apollo/client';
import { Search } from '@mui/icons-material';
import React, { useState } from 'react';
import { SEARCH_AND_EMPLOYEE } from '../queries';
import styles from './FilterByParamAnd.module.css';

export const FilterByParamAnd = () => {
  const [searchName, setSearchName] = useState("");
  const [searchJoin, setSearchJoin] = useState(2022);
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchAndEmployee,
    { data: dataSearchAnd, error: errorSearchAnd }
  ] = useLazyQuery(SEARCH_AND_EMPLOYEE, {
    fetchPolicy: "network-only"
  });
  return (
    <>
      <h3>Filter by Param AND Condition</h3>
      <input
        className={styles.filter_and__input}
        placeholder="Specified Employee Name"
        type="text"
        value={searchName}
        onChange={event => setSearchName(event.target.value)}
      />
      <input
        className={styles.filter_and__input}
        placeholder="Specified Employee Join Year"
        type="text"
        value={searchJoin}
        onChange={event => setSearchJoin(Number(event.target.value))}
      />
      <input
        className={styles.filter_and__input}
        placeholder="Specified Department"
        type="text"
        value={searchDepartment}
        onChange={event => setSearchDepartment(event.target.value)}
      />
      <Search
        className={styles.filter_and__search}
        onClick={async () => {
          await searchAndEmployee({
            variables: {
              name: searchName,
              joinYear: searchJoin === 0 ? null : searchJoin,
              department: searchDepartment,
            }
          });
          setSearchName("");
          setSearchJoin(0);
          setSearchDepartment("");
        }}
      />
    </>
  )
}
