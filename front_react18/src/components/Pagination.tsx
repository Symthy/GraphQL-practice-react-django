import { useLazyQuery, useQuery } from '@apollo/client';
import { Search } from '@mui/icons-material';
import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { PAGINATE_FIRST_EMPLOYEE, PAGINATE_LAST_EMPLOYEE, PAGINATE_MORE_EMPLOYEE } from '../queries';
import styles from './Pagination.module.css';

const NUM_PAGE = 3;
export const Pagination = () => {
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(0);
  const [paginateFirst, { data: dataFirst, error: errorFirst }] = useLazyQuery<EmployeeData>(
    PAGINATE_FIRST_EMPLOYEE,
    {
      fetchPolicy: "network-only"
    }
  )
  const [paginateLast, { data: dataLast, error: errorLast }] = useLazyQuery<EmployeeData>(
    PAGINATE_LAST_EMPLOYEE,
    {
      fetchPolicy: "network-only"
    }
  )
  const {
    data: dataPages,
    error: errorPages,
    loading: loadingPages,
    fetchMore,
  } = useQuery<DepartmentAndPageData>(PAGINATE_MORE_EMPLOYEE, {
    variables: { first: NUM_PAGE, after: null },
    fetchPolicy: "cache-and-network"
  })

  if (loadingPages) {
    return <h1>Loading...</h1>
  }

  return (
    <Grid container>
      <Grid item xs={4}>
        <h3> Paginate by first</h3>
        <input
          type="number"
          min="0"
          value={first}
          onChange={event => setFirst(Number(event.target.value))}
        />
        <Search
          className={styles.pagination__search}
          onClick={async () => {
            await paginateFirst({
              variables: {
                first: first,
              },
            });
            setFirst(0);
          }}
        />
        {errorFirst && <h3>{errorFirst.message}</h3>}
        {dataFirst && (
            <ul className={styles.pagination__list}>
            {dataFirst.allEmployees.edges.map(employee => (
              <li className={styles.pagination__item}>
                {employee.node.name + " / " + employee.node.joinYear + " / " + employee.node.department.departmentName}
              </li>
            ))}
           </ul>
         )}
      </Grid>
      <Grid item xs={4}>
        <h3> Paginate by last</h3>
        <input
          type="number"
          min="0"
          value={last}
          onChange={event => setLast(Number(event.target.value))}
        />
        <Search
          className={styles.pagination__search}
          onClick={async () => {
            await paginateLast({
              variables: { last: last }
            });
            setLast(0);
          }}
        />
        {errorLast && <h3>{errorLast.message}</h3>}
        {dataLast && (
            <ul className={styles.pagination__list}>
            {dataLast.allEmployees.edges.map(employee => (
              <li className={styles.pagination__item}>
                {employee.node.name + " / " + employee.node.joinYear + " / " + employee.node.department.departmentName}
              </li>
            ))}
           </ul>
         )}
      </Grid>
      <Grid item xs={4}>
        <h3> Pagination load more </h3>
        {errorPages && <h3>{errorPages.message}</h3>}
        {dataPages && (
          <ul className={styles.pagination__list}>
            {dataPages.allDepartments.edges.map(department => (
              <li className={styles.pagination__item}>
                {department.node.departmentName}
              </li>
            ))}
          </ul>
        )}
        {dataPages && dataPages.allDepartments.pageInfo.hasNextPage && (
          <button
            onClick={() => fetchMore({
              variables: {
                first: NUM_PAGE,
                after: dataPages.allDepartments.pageInfo.endCursor || null
              },
              updateQuery: (prevLoad, { fetchMoreResult }) => {
                fetchMoreResult.allDepartments.edges = [
                  ...prevLoad.allDepartments.edges,
                  ...fetchMoreResult.allDepartments.edges,
                ];
                return fetchMoreResult;
              }
            })}
          >
            Load More
          </button>
        )}
      </Grid>
    </Grid>
  )
}
