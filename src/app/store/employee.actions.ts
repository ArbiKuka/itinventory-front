import { createAction, props } from '@ngrx/store';
import { Employee } from '../models/employee.model';

export const loadEmployees = createAction('[Employee] Load Employees');
export const loadEmployeesSuccess = createAction(
  '[Employee] Load Employees Success',
  props<{ employees: Employee[] }>()
);
export const loadEmployeesFailure = createAction(
  '[Employee List] Load Employees Failure',
  props<{ error: any }>()
);
export const addEmployee = createAction(
  '[Employee] Add Employee',
  props<{ employee: Employee }>()
);
export const addEmployeeSuccess = createAction(
  '[Employee List] Add Employee Success',
  props<{ employee: Employee }>()
);
export const addEmployeeFailure = createAction(
  '[Employee List] Add Employee Failure',
  props<{ error: any }>()
);
export const updateEmployee = createAction(
  '[Employee] Update Employee',
  props<{ employee: Employee }>()
);
export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  props<{ id: number }>()
);