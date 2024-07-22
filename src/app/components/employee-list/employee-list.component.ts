import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { Employee } from '../../models/employee.model';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import * as EmployeeActions from '../../store/employee.actions';
import {
  selectAllEmployees,
  selectEmployeeCount,
} from '../../store/employee.selectors';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    EmployeeFormComponent,
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;
  filteredEmployees$: Observable<Employee[]> | undefined;
  searchTerm: string = '';
  displayedColumns: string[] = ['id', 'name', 'email', 'devices', 'actions'];
  isFormOpen = false;
  editingEmployee: Employee | null = null;
  employeeCount$: Observable<number>;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    this.employees$ = this.store.select(selectAllEmployees);
    this.filteredEmployees$ = this.employees$;
    this.employeeCount$ = this.store.select(selectEmployeeCount);
  }

  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());
  }

  filterEmployees(): void {
    if (!this.searchTerm) {
      this.filteredEmployees$ = this.employees$;
    } else {
      this.filteredEmployees$ = this.employees$.pipe(
        map((employees) =>
          employees.filter((employee) =>
            employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        )
      );
    }
  }

  openForm(employee: Employee | null = null): void {
    this.editingEmployee = employee;
    this.isFormOpen = true;
  }

  closeForm(newEmployee: Employee | null): void {
    this.isFormOpen = false;
    if (newEmployee !== null) {
      if (this.editingEmployee) {
        this.updateEmployee(newEmployee);
      } else {
        this.addEmployee(newEmployee);
      }
    }
  }

  addEmployee(newEmployee: Employee): void {
    if (newEmployee.name && newEmployee.email) {
      this.store.dispatch(
        EmployeeActions.addEmployee({ employee: newEmployee })
      );
    }
  }

  updateEmployee(updatedEmployee: Employee): void {
    if (updatedEmployee.id !== undefined) {
      this.store.dispatch(
        EmployeeActions.updateEmployee({ employee: updatedEmployee })
      );
    }
  }

  onNoClick(): void {
    this.isFormOpen = false;
  }

  deleteEmployee(id: number): void {
    this.store.dispatch(EmployeeActions.deleteEmployee({ id }));
  }
}
