import { Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, MatFormField],
})
export class EmployeeFormComponent {
  @Input() employee: Employee | null = null;
  @Output() closeForm = new EventEmitter<Employee | null>();

  newEmployee: Employee = { name: '', email: '', devices: [] };

  onNoClick(): void {
    this.closeForm.emit(null);
  }

  ngOnChanges() {
    if (this.employee) {
      this.newEmployee = { ...this.employee };
    }
  }

  onSubmit() {
    this.closeForm.emit(this.newEmployee);
    this.newEmployee = { name: '', email: '', devices: [] };
  }
}
