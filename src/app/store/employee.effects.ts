import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../services/employee.service';
import * as EmployeeActions from './employee.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class EmployeeEffects {
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),
      mergeMap(() =>
        this.employeeService.getEmployees().pipe(
          map((employees) =>
            EmployeeActions.loadEmployeesSuccess({ employees })
          ),
          catchError((error) =>
            of(EmployeeActions.loadEmployeesFailure({ error }))
          )
        )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),
      mergeMap((action) =>
        this.employeeService.addEmployee(action.employee).pipe(
          map((employee) => EmployeeActions.addEmployeeSuccess({ employee })),
          catchError((error) =>
            of(EmployeeActions.addEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),
      mergeMap((action) =>
        this.employeeService.updateEmployee(action.employee).pipe(
          mergeMap(() => this.employeeService.getEmployees()),
          map((employees) =>
            EmployeeActions.loadEmployeesSuccess({ employees })
          ),
          catchError((error) =>
            of(EmployeeActions.updateEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      mergeMap((action) =>
        this.employeeService.deleteEmployee(action.id).pipe(
          map(() => EmployeeActions.deleteEmployeeSuccess({ id: action.id })),
          catchError((error) =>
            of(EmployeeActions.deleteEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}