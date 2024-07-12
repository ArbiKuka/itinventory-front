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

import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

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

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {
    this.employees$ = this.employeeService.employees$;
    this.filteredEmployees$ = this.employees$;
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(() => {
      this.cdr.detectChanges();
    });
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

  onNoClick(): void {
    this.isFormOpen = false;
  }

  addEmployee(newEmployee: Employee): void {
    if (newEmployee.name && newEmployee.email) {
      this.employeeService.addEmployee(newEmployee).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  updateEmployee(updatedEmployee: Employee): void {
    if (updatedEmployee.id !== undefined) {
      this.employeeService.updateEmployee(updatedEmployee).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }
}
