type Token = {
  iat: number;
  exp: number;
}

type AuthTokenData = {
  tokenAuth: {
    token: string
  }
}

type DepartmentNode = {
  id: string
  departmentName: string
}

type DepartmentEdgeNode = {
  cursor?: string
  node: DepartmentNode
}

type DepartmentNodeConnection = {
  edges: DepartmentEdgeNode[]
}

type DepartmentData = {
  allDepartments: DepartmentNodeConnection
}

type PageInfo = {
  pageInfo: {
    startCursor: string
    endCursor: string
    hasNextPage: number
  }
}

type DepartmentAndPageData = {
  allDepartments: DepartmentNodeConnection & PageInfo
}

type DepartmentVars = DepartmentNode

type EmployeeNode = {
  id: string
  name: string
  joinYear: number
  department: DepartmentNode
}

type EmployeeEdgeNode = {
  node: EmployeeNode
}

type EmployeeNodeConnection = {
  edges: EmployeeEdgeNode[]
}

type EmployeeData = {
  allEmployees: EmployeeNodeConnection
}

type EmployeeSingleData = {
  employee: EmployeeNode
}

type EmployeeVars = {
  id: string
  name: string
  joinYear: number
}

type EmployeeSingleVars = {
  id: string
}

type EmployeeSearchByNameVars = {
  name: string
}
