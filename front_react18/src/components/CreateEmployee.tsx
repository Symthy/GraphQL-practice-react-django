import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { CREATE_EMPLOYEE, GET_EMPLOYEES, UPDATE_EMPLOYEE } from "../queries";
import styles from "./CreateEmployee.module.css";


type CreateEmployeeProps = {
  dataDepartments: DepartmentData | undefined
}

export const CreateEmployee = ({ dataDepartments }: CreateEmployeeProps) => {
  const {
    name,
    setName,
    joinYear,
    setJoinYear,
    departmentName,
    setDepartmentName,
    selectedDepartment,
    setSelectedDepartment,
    editedId,
    setEditedId
   } = useContext(StateContext);

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES}]
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES}]
  });

  const selectOption = dataDepartments?.allDepartments.edges.map(department =>
    <option key={department.node.id} value={department.node.id}>
      {department.node.departmentName}
    </option>
  );

  return (
    <>
      <div>
        <input
          className={styles.employee_create__input}
          placeholder="Employee Name"
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <input
          className={styles.employee_create__input}
          placeholder="Join Year"
          type="number"
          value={joinYear}
          onChange={event => setJoinYear(Number(event.target.value))}
        />
      </div>
      <select
        value={selectedDepartment}
        onChange={event => setSelectedDepartment(event.target.value)}
      >
        <option value="">select</option>
        {selectOption}
      </select>
      <button
        disabled={!selectedDepartment || !name || !joinYear}
        className={styles.employee_create_btn}
        onClick={
          editedId ?
            async () => {
              try {
                await updateEmployee({
                  variables: {
                    id: editedId,
                    name: name,
                    joinYear: joinYear,
                    department: selectedDepartment
                  }
                });
              } catch (err: any) {
                alert(err.message);
              }
              setEditedId("");
              setName("");
              setJoinYear(2022);
              setSelectedDepartment("");
            }
            : async () => {
              try {
                await createEmployee({
                  variables: {
                    name: name,
                    joinYear: joinYear,
                    department: selectedDepartment
                  }
                });
              } catch (err: any) {
                alert(err.message);
              }
              setName("");
              setJoinYear(2022);
              setSelectedDepartment("");
            }
        }>
        {editedId ? "Update" : "Create"}
      </button>
    </>
  );
}
