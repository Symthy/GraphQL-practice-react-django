import { useQuery } from '@apollo/react-hooks';
import { ExitToApp } from '@mui/icons-material';
import { Grid } from '@mui/material';
import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { GET_DEPARTMENTS, GET_EMPLOYEES } from '../queries';
import { CreateEmployee } from './CreateEmployee';
import { Departments } from './Departments';
import { EmployeeDetails } from './EmployeeDetails';
import { Employees } from './Employees';
import { FilterByName } from './FilterByName';
import { FilterByParamAnd } from './FilterByParamAnd';
import styles from './MainPage.module.css';
import { Pagination } from './Pagination';


export const MainPage = () => {
  const {
    loading: loadingEmployees,
    data: dataEmployees,
    error: errorEmployees,
  } = useQuery<EmployeeData, EmployeeVars>(GET_EMPLOYEES);

  const {
    loading: loadingDepartments,
    data: dataDepartments,
    error: errorDepartments,
  } = useQuery(GET_DEPARTMENTS);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decodeToken = jwtDecode<Token>(localStorage.getItem('token')!);
      if (decodeToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      }
      return
    }
    window.location.href = "/";
    // 期限切れの時にクリア
  }, [errorEmployees]);

  if (loadingEmployees || loadingDepartments) {
    return <h1>loading...</h1>
  } else if (errorEmployees || errorDepartments) {
    return (
      <>
        <h1>Employee fetch error: {errorEmployees ? errorEmployees.message : "non error?!"}</h1>
        <h1>Department fetch error: { errorDepartments ? errorDepartments.message : "non error?!" }</h1>
      </>
    )
  }

  return (
    <div className={styles.mainpage}>
      <div className={styles.mainpage__header}>
        <h1>GraphQL Practice</h1>
        <ExitToApp
          className={styles.mainpage__logout}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        />
      </div>

      <CreateEmployee dataDepartments={dataDepartments} />

      <Grid container>
        <Grid item xs={4}>
          <Employees dataEmployees={dataEmployees}/>
        </Grid>
        <Grid item xs={4}>
          <EmployeeDetails />
        </Grid>
        <Grid item xs={3}>
          <Departments dataDepartments={dataDepartments}/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={2}>
          <FilterByName />
        </Grid>
        <Grid item xs={3}>
          <FilterByParamAnd />
        </Grid>
        <Grid item xs={6}>
          <Pagination />
        </Grid>
      </Grid>
    </div>
  );
}
