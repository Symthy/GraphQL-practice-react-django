import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation($username: String!, $password: String!) {
    createUser(input: { username: $username, password: $password, email:""}) {
      user {
        id
        username
      }
    }
  }
`;

export const GET_TOKEN = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query {
    allEmployees {
      edges {
        node {
          id
          name
          joinYear
          department {
            id
            departmentName
          }
        }
      }
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  query {
    allDepartments {
      edges {
        node {
          id
          departmentName
        }
      }
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation($name: String!, $joinYear: Int!, $department: ID!) {
    createEmployee(
      input: { name: $name, joinYear: $joinYear, department: $department }
    ) {
      employee {
        id
        name
        joinYear
        department {
          id
          departmentName
        }
      }
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation($id: ID!, $name: String!, $joinYear: Int!, $department: ID!) {
    updateEmployee(
      input: {
        id: $id
        name: $name
        joinYear: $joinYear
        department: $department
      }
    ) {
      employee {
        id
        name
        joinYear
        department {
          id
          departmentName
        }
      }
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation($id: ID!) {
    deleteEmployee(input: { id: $id }) {
      employee {
        id
      }
    }
  }
`;

export const GET_SINGLE_EMPLOYEE = gql`
  query($id: ID!) {
    employee(id: $id) {
      id
      name
      joinYear
      department {
        id
        departmentName
      }
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation($departmentName: String!) {
    createDepartment(input: {departmentName: $departmentName}) {
      department {
        id
        departmentName
      }
    }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation($id: ID!) {
    deleteDepartment(input: {id: $id}) {
      department {
        id
      }
    }
  }
`;

export const SEARCH_EMPLOYEE = gql`
  query($name: String) {
    allEmployees(name_Icontains: $name) {
      edges {
        node {
          id
          name
          joinYear
          department {
            id
            departmentName
          }
        }
      }
    }
  }
`;

export const SEARCH_AND_EMPLOYEE = gql`
  query($name: String, $joinYear: Int, $department: String) {
    allEmployees(
      name_Icontains: $name
      joinYear: $joinYear
      department_DepartmentName_Icontains: $department
    ) {
      edges {
        node {
          id
          name
          joinYear
          department {
            id
            departmentName
          }
        }
      }
    }
  }
`;

export const PAGINATE_FIRST_EMPLOYEE = gql`
  query($first: Int) {
    allEmployees(first: $first) {
      edges {
        node {
          id
          name
          joinYear
          department {
            id
            departmentName
          }
        }
      }
    }
  }
`;

export const PAGINATE_LAST_EMPLOYEE = gql`
  query($last: Int) {
    allEmployees(last: $last) {
      edges {
        node {
          id
          name
          joinYear
          department {
            id
            departmentName
          }
        }
      }
    }
  }
`;

export const PAGINATE_MORE_EMPLOYEE = gql`
  query($first: Int, $after: String) {
    allDepartments(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          departmentName
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
`;
