import { Action, createReducer, on } from '@ngrx/store';
import { Employee } from '../models/employee.model';
import * as EmployeeActions from './employee.actions';

export interface EmployeeState {
  employees: Employee[];
  error: any;
}

export const initialState: EmployeeState = {
  employees: [],
  error: null,
};

export const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees: employees,
    error: null,
  })),
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(EmployeeActions.addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    error: null,
  })),
  on(EmployeeActions.addEmployeeFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: state.employees.map((emp) =>
      emp.id === employee.id ? employee : emp
    ),
    error: null,
  })),

  on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employees: state.employees.filter((emp) => emp.id !== id),
    error: null,
  })),
  on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export function reducer(state: EmployeeState | undefined, action: Action) {
  return employeeReducer(state, action);
}
