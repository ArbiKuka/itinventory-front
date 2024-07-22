import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducer';

export const selectEmployeeState =
  createFeatureSelector<EmployeeState>('employees');

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.employees
);

export const selectEmployeeCount = createSelector(
  selectAllEmployees,
  (employees) => employees.length
);
